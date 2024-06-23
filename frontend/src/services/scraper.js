import axios from 'axios'
import { load } from 'cheerio'

class Scrapper {
    constructor() { }

    scrape(id, callback) {
        try {
            const url = 'https://goone.pro/videos/' + id
            const linkURL = localStorage.getItem(id)
            if (linkURL) {
                callback(JSON.parse(linkURL))
                return
            }
            axios.get(url)
                .then((response) => {
                    const $ = load(response.data)
                    const link = 'https:' + $('iframe:first-child').attr('src') || null
                    if (link) {
                        localStorage.setItem(id, JSON.stringify({ link, status: 200 }))
                    }
                    callback({ link, status: 200 })
                })
                .catch(() => {
                    callback({ link: null, status: 404 })
                })
        } catch (e) {
            console.error(e)
            callback({ link: null, status: 404 })
        }
    }
}

const scrapper = new Scrapper()

export default scrapper
