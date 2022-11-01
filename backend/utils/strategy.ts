import passport from 'passport'
import { Strategy } from 'passport-local'
import { client } from '../prisma/prismaClient'
import * as argon2 from 'argon2'

declare global {
    namespace Express {
        interface User {
            id: number
        }
    }
}

declare module 'express-session' {
    export interface SessionData {
        passport: { user: number }
    }
}

passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const user = await client.user.findUnique({
                where: {
                    lower_username: username.toLowerCase(),
                },
            })

            if (user && (await argon2.verify(user.password, password))) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (err) {
            return done(err)
        }
    })
)

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function (id: number, done) {
    try {
        const user = await client.user.findUnique({ where: { id } })
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})

export default passport
