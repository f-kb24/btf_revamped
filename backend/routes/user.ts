import express from 'express'
import { client } from '../prisma/prismaClient'
import * as argon2 from 'argon2'
import session from 'express-session'
import r from 'connect-redis'
import Redis from 'ioredis'
import passport from '../utils/strategy'

const secret = process.env.SECRET ? process.env.SECRET : ''
const redisUrl = process.env.REDIS_URL ? process.env.REDIS_URL : ''

const RedisStore = r(session)
const redisClient = new Redis(redisUrl)
const userRouter = express.Router()

userRouter.use(
    session({
        secret,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        store: new RedisStore({ client: redisClient }),
    })
)
userRouter.use(passport.initialize())
userRouter.use(passport.session())

userRouter.post('/setpictureforuser', async (req, res, next) => {
    const { id } = req.body
    // selected isn't part of Session, so we will have to do some merge declarations
    // for now ts ignore
    // @ts-ignore
    req.session.selected = id
    res.json({ msg: 'success' })
})

userRouter.get('/auth', async (req, res) => {
    if (!req.session?.passport?.user) {
        res.status(401).json({ msg: 'unathenticated' })
    } else {
        const user = await client.user.findUnique({
            where: { id: req.session.passport.user },
            select: {
                username: true,
                id: true,
                password: false,
            },
        })
        if (!user) {
            res.status(401).json({ msg: 'fatal: user logged in, but unable to find ' })
        } else {
            //@ts-ignore
            const u = { ...user, selected: req.session.selected }

            return res.json(u)
        }
    }
})

userRouter.post('/login', passport.authenticate('local'), (req, res) => {
    //@ts-ignore
    const u = { ...req.user, selected: req.session.selected }
    res.json(u)
})

userRouter.get('/logout', (req, res) => {
    // figure out how to invalidate session later, for now just clear cookie
    // req.logout()
    res.clearCookie('connect.sid', { path: '/' }).status(200).send('ok')
})

userRouter.route('/create').post(async (req, res, next) => {
    try {
        const { username, password } = req.body
        const lowerUsername = username.toLowerCase()
        const userExists = await client.user.findUnique({
            where: {
                lower_username: lowerUsername,
            },
        })
        if (userExists) {
            res.status(400).json({ msg: `username: ${username} already exists` })
        }
        const hashedPassword = await argon2.hash(password)

        const user = await client.user.create({
            data: {
                username,
                lower_username: lowerUsername,
                password: hashedPassword,
            },
            select: {
                username: true,
                password: false,
            },
        })
        res.json(user)
    } catch (err) {
        next(err)
    }
})

export default userRouter
