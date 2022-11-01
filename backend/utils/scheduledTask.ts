import queue from './producer'

const scheduledtask = async () => {
    await queue.add('fetchPictures', null, {
        repeat: {
            every: 120000,
        },
    })
    console.log('fetching pictures task has been set for every 2 minutes')
}

const removeScheduledTasks = async () => {
    const repeatables = await queue.getRepeatableJobs()
    repeatables.forEach((repeatable) => {
        queue.removeRepeatableByKey(repeatable.key)
        console.log(`task ${repeatable.key} has been removed`)
    })
}

export { scheduledtask, removeScheduledTasks }
