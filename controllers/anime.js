import MAAnimes from '../models/anime.js'

export default function AnimeController() {
    return {
        getAnime: async function ({ anilist_id }) {
            try {
                const result = await MAAnimes.findOne({ anilist_id })
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
                const anime = new MAAnimes({
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
                const result = await MAAnimes.findOneAndUpdate({ anilist_id }, { romaji })
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
