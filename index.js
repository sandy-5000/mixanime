import express from "express"
import session from "express-session"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import nunjucks from 'nunjucks'
import path from 'path'
const __dirname = path.resolve()
dotenv.config()
import { fetchHomePage, findAnimeList, searchAnimeList, animeDetails } from "./utils/anilist.fetch.js"
import { getVideoLink } from "./utils/scrapper.js"
import user from "./routes/user.js"
import EpisodeController from "./controllers/episode.js"
import AnimeController from "./controllers/anime.js"
import admin from "./routes/admin.js"


const app = express()
app.use(express.json())
app.use(cors())
nunjucks.configure('views', {
    autoescape: true,
    express: app
})
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true
}))


const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '0.0.0.0'
const MONGO_DB_URL = process.env.MONGO_DB_URL

app.get("/", async (req, res) => {
    const logged = req.session.user ? 'logout' : 'login'
    const result = await getDate('homePage')
    res.render('index.html', { ...result.data, logged })
})

app.get("/home", async (req, res) => {
    const logged = req.session.user ? 'logout' : 'login'
    const result = await getDate('homePage')
    res.render('index.html', { ...result.data, logged })
})

app.get("/advancedsearch", async (req, res) => {
    const logged = req.session.user ? 'logout' : 'login'
    const result = await searchAnimeList(req.query)
    res.render('search.html', {
        items: result.data.data.Page.media,
        pageInfo: result.data.data.Page.pageInfo,
        logged
    })
})

app.get("/details/:id", async (req, res) => {
    const logged = req.session.user ? 'logout' : 'login'
    const id = parseInt(req.params.id)
    const result = await getDate('animeDetails', id)
    if (result.data == null) {
        res.status(404).json({ error: 'Invalid id' })
        return
    }
    res.render('details.html', { item: result.data, logged })
})

app.get("/watch/:id/:romji/:episode", async (req, res) => {
    const logged = req.session.user ? 'logout' : 'login'
    let { id, romji, episode } = req.params
    episode = parseInt(episode)
    if (!romji || !episode || episode < 0 || romji.trim() == '') {
        res.status(404).json({ error: 'page not found' })
    }
    let result = await getDate('animeDetails', id)
    const link = await getLink(+id, +episode, romji)
    result.data.link = link
    res.render('watch.html', { item: result.data, logged })
})

app.get("/viewmore", async (req, res) => {
    const logged = req.session.user ? 'logout' : 'login'
    const result = await searchAnimeList(req.query)
    res.render('viewmore.html', {
        items: result.data.data.Page.media,
        pageInfo: result.data.data.Page.pageInfo,
        logged
    })
})

const cache = new Map()
const getDate = async (page, ...params) => {
    const utilFunctions = {
        homePage: fetchHomePage,
        animeDetails: animeDetails,
        episodeLink: getVideoLink
    }
    const key = page + params.join('-')
    if (!cache.has(key)) {
        cache.set(key, await utilFunctions[page](...params))
        setInterval(() => {
            cache.delete(key)
        }, 900 * 1000)
        console.info('cache miss')
    } else {
        console.info('cache hit')
    }
    return cache.get(key)
}

const animes = new Map()
const animeCtrl = AnimeController()
const episodes = new Map()
const episodeCtrl = EpisodeController()
const getLink = async (id, episode, romaji) => {
    try {
        if (episodes.has(id + '-' + episode)) {
            return episodes.get(id + '-' + episode)
        }
        let { result, status } = await episodeCtrl.getLinks({ anilist_id: id, episode_no: episode })
        if (status == 200) {
            episodes.set(id + '-' + episode, result.links[0])
            return result.links[0]
        }
        if (animes.has(id)) {
            romaji = animes.get(id)
        } else {
            let anime = await animeCtrl.getAnime({ anilist_id: id })
            if (anime.status == 200) {
                romaji = anime.result.romaji
                animes.set(id, romaji)
            }
        }
        romaji = romaji.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
        let uuid = romaji + '-episode-' + episode
        let link = await getDate('episodeLink', uuid)
        link = link.link
        if (link != null) {
            await episodeCtrl.putLink({ anilist_id: id, episode_no: episode, link })
            episodes.set(id + '-' + episode, link)
        }
        return link
    } catch (e) {
        return null
    }
}

let count = 0
app.get("/api", (req, res) => {
    ++count
    res.status(200).json({ message: `Hello from server [ count: ${count} ]` })
})

app.get("/api/findanime", async (req, res) => {
    const { animename } = req.query
    if (!animename || animename.trim() == '') {
        res.status(403).json({ error: 'animename should not be empty' })
        return
    }
    const result = await findAnimeList(animename.trim())
    res.status(result.status).json(result.data)
})

app.get("/api/details/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(404).json({ error: 'invalid id' })
        return
    }
    const result = await animeDetails(id)
    res.status(result.status).json(result.data)
})

app.get("/api/:id/:romji/:episode", async (req, res) => {
    let { id, romji, episode } = req.params
    episode = parseInt(episode)
    if (!romji || !episode || episode < 0 || romji.trim() == '') {
        res.status(404).json({ error: 'page not found' })
    }
    const link = await getLink(+id, +episode, romji)
    res.status(200).json({ link: link })
})

app.get("/reset", async (req, res) => {
    if (req.session.user?.result.email != 'sandyblaze911@gmail.com') {
        return res.status(403).json({ message: 'FY' })
    }
    animes.clear()
    episodes.clear()
    cache.clear()
    res.status(200).json({ message: 'done' })
})

app.use('/user', user)
app.use('/admin', admin)

mongoose
    .connect(MONGO_DB_URL)
    .then(() => {
        console.log("DB Connected")
        app.listen(PORT, () => console.log(`Open http://${HOST}:${PORT}`))
    })
    .catch(() => console.log("db NOT connected"))

// app.listen(PORT, () => console.log(`Open http://${HOST}:${PORT}`))
