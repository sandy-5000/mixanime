import express from 'express'
import AnimeController from '../controllers/anime.js'

const app = express.Router()
const animeCtrl = AnimeController()

app.route('/:id/:episode/:romaji').get((req, res) => {
  const { id, episode, romaji } = req.params
  animeCtrl.getEpisode(
    {
      anilist_id: id,
      episode_no: episode,
      romaji: romaji,
    },
    ({ result, status }) => {
      res.status(status).json(result)
    }
  )
})

const anime = app
export default anime
