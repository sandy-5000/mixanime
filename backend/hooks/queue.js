import MAEpisode from '../models/episode.js'
import { scrape } from '../utils/scraper.js'


const postMQueueFindOneAndUpdate = function (result) {
    const romaji = this._update['$set'].romaji
    const { anilist_id, episode_no } = this._conditions
    if (episode_no == null || episode_no == undefined) {
        return
    }
    const id = romaji + '-episode-' + this._conditions.episode_no
    scrape(id, (urlData) => {
        if (!urlData.link) {
            this.episodeLink = {
                "link": null,
                "status": 200
            }
            return
        }
        MAEpisode.findOneAndUpdate({ anilist_id, episode_no }, {
            $set: {
                links: [urlData.link]
            }
        }, { upsert: true })
            .then(result => { })
            .catch(error => console.log(error))
    })
}

export { postMQueueFindOneAndUpdate }