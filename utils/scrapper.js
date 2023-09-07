import axios from "axios"
import cheerio from "cheerio"


export const getVideoLink = async (id) => {
    try {
        const url = 'https://goone.pro/videos/' + id
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const link = 'https:' + $('iframe:first-child').attr('src') || null
        return { link, status: 200 }
    } catch (e) {
        console.error(e)
        return { link: null, status: 404 }
    }
}
