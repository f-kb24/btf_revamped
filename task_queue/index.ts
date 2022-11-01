import { Worker, Job } from 'bullmq'
import IORedis from 'ioredis'
import { redditApi } from './api'
import { client } from './prisma/prismaClient'

if (process.env.REDIS_URL) {
    const connection = new IORedis(process.env.REDIS_URL, { maxRetriesPerRequest: null })

    const worker = new Worker(
        'myqueue',
        async (job: Job) => {
            switch (job.name) {
                case 'fetchPictures':
                    const response = await redditApi.getPictures()
                    response.data.children.forEach(async (child: any) => {
                        const { id, score, title, author, url, num_comments, thumbnail_width, thumbnail, preview } =
                            child.data
                        if (preview) {
                            let selectedResolution = {
                                url: '',
                                width: 0,
                                height: 0,
                                distance: 10000,
                            }
                            preview.images[0].resolutions.forEach(
                                ({ url, width, height }: { url: string; width: number; height: number }) => {
                                    if (
                                        width - thumbnail_width > 0 &&
                                        width - thumbnail_width < selectedResolution.distance
                                    ) {
                                        selectedResolution = {
                                            url,
                                            width,
                                            height,
                                            distance: width - thumbnail_width,
                                        }
                                    }
                                }
                            )
                            try {
                                const response = await client.picture.upsert({
                                    where: { id },
                                    update: { score, num_comments, reso: selectedResolution },
                                    create: {
                                        id,
                                        thumbnail,
                                        score,
                                        title,
                                        author,
                                        url,
                                        num_comments,
                                        reso: selectedResolution,
                                    },
                                })
                            } catch (err) {
                                console.log(err)
                            }
                        }
                    })
                    break
            }
        },
        {
            connection,
        }
    )

    worker.on('completed', (job) => {
        console.log(`${job.id} has completed!`)
    })

    worker.on('failed', (job, err) => {
        console.log(`${job.id} has failed with ${err.message}`)
    })
} else {
    console.log('env var REDIS_URL not found, please check bull service in docker-compose.yml')
}
