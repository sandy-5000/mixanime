import express from "express"
import bodyParser from "body-parser"
import AnimeController from "../controllers/anime.js"

const app = express.Router()
app.use(bodyParser.urlencoded({ extended: false }))

const animeCtrl = AnimeController()

app.route('/logged')
    .get(async (req, res) => {
        if (req.session.user?.result.email != 'sandyblaze911@gmail.com') {
            return res.status(403).json({ message: 'FY' })
        }
        return res.status(200).json({ message: 'Yes' })
    })

app.route('/setanime')
    .post(async (req, res) => {
        if (req.session.user?.result.email != 'sandyblaze911@gmail.com') {
            return res.status(403).json({ message: 'FY' })
        }
        const { id, romaji } = req.body
        romaji = romaji.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
        const { status, result } = await animeCtrl.setAnime({ anilist_id: id, romaji })
        return res.status(status).json({ message: 'done' })
    })

app.route('/updateanime')
    .post(async (req, res) => {
        if (req.session.user?.result.email != 'sandyblaze911@gmail.com') {
            return res.status(403).json({ message: 'FY' })
        }
        const { id, romaji } = req.body
        romaji = romaji.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
        const { status, result } = await animeCtrl.updateAnime({ anilist_id: id, romaji })
        return res.status(status).json({ message: 'done' })
    })

const admin = app
export default admin
