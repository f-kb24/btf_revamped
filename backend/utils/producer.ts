import { Queue, Job } from 'bullmq'
import IORedis from 'ioredis'

const url = process.env.REDIS_URL ? process.env.REDIS_URL : ''
if (url === '') {
    console.log('ERROR: env var BULL_URL not set, please check env vars of directory in docker-compose.yml')
}

const connection = new IORedis(url, { maxRetriesPerRequest: null })
const queue = new Queue('myqueue', {
    connection,
})

export default queue
