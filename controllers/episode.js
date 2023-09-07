import MAEpisodes from '../models/episode.js'

export default function EpisodeController() {
    return {
        getLinks: async function ({ anilist_id, episode_no }) {
            try {
                const result = await MAEpisodes.findOne({ anilist_id, episode_no })
                if (!result) {
                    return { result: 'Not Found', status: 404 }
                }
                return { result, status: 200 }
            } catch (e) {
                return { result: e, status: 400 }
            }
        },
        putLink: async function ({ anilist_id, episode_no, link }) {
            try {
                if (!await MAEpisodes.findOne({ anilist_id, episode_no })) {
                    const episode = new MAEpisodes({
                        anilist_id, episode_no, links: []
                    })
                    await episode.save()
                }
                const result = await MAEpisodes.findOneAndUpdate({ anilist_id, episode_no }, {
                    $push: {
                        links: link
                    }
                })
                if (!result) {
                    return { result: 'Update Failed', status: 400 }
                }
                return { result, status: 200 }
            } catch (e) {
                return { result: e, status: 400 }
            }
        },
    }
}
