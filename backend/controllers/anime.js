import MAAnime from '../models/anime.js'
import MAEpisode from '../models/episode.js'
import MAQueue from '../models/queue.js'


export default function AnimeController() {
    return {
        getEpisode: async function ({ anilist_id, episode_no, romaji }, callback) {
            let defaultRes = {
                uuid: null,
                id: anilist_id,
                episode: episode_no,
                linkURL: {
                    link: null,
                    status: 200
                },
                meta_data: {
                    shift: 0,
                },
            }
            try {
                anilist_id = parseInt(anilist_id)
                episode_no = parseInt(episode_no)
                const result = await MAEpisode.aggregate([
                    {
                        $match: { anilist_id, episode_no }
                    },
                    {
                        $lookup: {
                            from: 'maanimes',
                            localField: 'anilist_id',
                            foreignField: 'anilist_id',
                            as: 'title'
                        }
                    }
                ])
                if (result.length === 1) {
                    defaultRes.uuid = result[0]?.title?.romaji || null
                    defaultRes.linkURL.link = result[0]?.links[0] || null
                    return callback({
                        result: defaultRes,
                        status: 200
                    })
                }
                const anime = await MAAnime.findOne({ anilist_id })
                defaultRes.uuid = anime?.romaji || null
                if (anime.meta_data) {
                    defaultRes.meta_data = { shift: 0, ...anime.meta_data }
                }
                await MAQueue.findOneAndUpdate({
                    anilist_id, episode_no
                }, {
                    $inc: {
                        frequency: 1
                    },
                    $set: {
                        event_type: 'episode',
                        meta_data: defaultRes.meta_data,
                        romaji: defaultRes.uuid || romaji
                    }
                }, { upsert: true, returnNewDocument: true })
                return callback({
                    result: defaultRes,
                    status: 200
                })
            } catch (e) {
                console.log(e)
                return callback({
                    result: defaultRes,
                    status: 200
                })
            }
        },
        getAnime: async function ({ anilist_id }) {
            try {
                const result = await MAAnime.findOne({ anilist_id })
                if (!result) {
                    return { result: 'Not Found', status: 404 }
                }
                return { result, status: 200 }
            } catch (e) {
                return { result: e, status: 400 }
            }
        },
        setAnime: async function ({ anilist_id, romaji }) {
            try {
                await MAEpisode.deleteMany({ anilist_id })
                const anime = new MAAnime({
                    anilist_id,
                    romaji
                })
                await anime.save()
                return { result: anime, status: 200 }
            } catch (e) {
                return { result: e, status: 400 }
            }
        },
        updateAnime: async function ({ anilist_id, romaji }) {
            try {
                await MAEpisode.deleteMany({ anilist_id })
                const result = await MAAnime.findOneAndUpdate({ anilist_id }, { romaji })
                if (!result) {
                    return { result, status: 400 }
                }
                return { result, status: 200 }
            } catch (e) {
                return { result: e, status: 400 }
            }
        },
    }
}
