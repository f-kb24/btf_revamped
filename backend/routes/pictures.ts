import express from 'express'
import { client } from '../prisma/prismaClient'

const pictureRouter = express.Router()

pictureRouter.get('/get', async (req, res, next) => {
    try {
        const pictures = await client.picture.findMany({
            orderBy: [{ score: 'desc' }],
            take: 20,
        })
        if (!pictures) {
            res.status(404).json({ msg: 'Pictures currently unavailable.' })
        }
        res.json(pictures)
    } catch (err) {
        next(err)
    }
})

pictureRouter.post('/setpictureforuser', async (req, res, next) => {
    const { id } = req.body
    // selected isn't part of Session, so we will have to do some merge declarations
    // for now ts ignore
    // @ts-ignore
    req.session.selected = id
    res.json({ msg: 'success' })
})

export default pictureRouter
