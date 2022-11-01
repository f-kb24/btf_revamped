import express, { Express, Request, Response, json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRouter from './routes/user'
import pictureRouter from './routes/pictures'
import cookieParser from 'cookie-parser'
import { scheduledtask, removeScheduledTasks } from './utils/scheduledTask'

const app: Express = express()
const port = process.env.PORT

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(json())

// Sessions with Redis

app.use(morgan('tiny'))
app.use('/user', userRouter)
app.use('/picture', pictureRouter)

app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
    // bullmq is smart enough to never schedule the same repeatable tasks with the same configurations
    // this is just a sanity check and to remove older defunct tasks
    await removeScheduledTasks()
    await scheduledtask()
})
