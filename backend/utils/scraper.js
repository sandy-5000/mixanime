import axios from 'axios'
import { load } from 'cheerio'

const scrape = (id, callback) => {
    try {
        const url = 'https://goone.pro/videos/' + id
        axios.get(url)
            .then((response) => {
                const $ = load(response.data)
                const link = 'https:' + $('iframe:first-child').attr('src') || null
                callback({ link, status: 200 })
            })
            .catch((error) => {
                callback({ link: null, status: 404 })
            })
    } catch (e) {
        console.error(e)
        callback({ link: null, status: 404 })
    }
}

export { scrape }
