import { queries } from "./queries.js"

import fs from "fs"
import { homeData, findAnime, searchData, sampleAnimeDetails } from "./sample.data.js"
async function write(data) {
    data = JSON.stringify(data)
    fs.writeFileSync('./__tmp/data.json', data)
}

const url = 'https://graphql.anilist.co'

export const fetchHomePage = async () => {
    return { data: homeData, status: 200 }
    const variables = {
        carousel: {
            page: 1,
            perPage: 9,
        },
        trending: {
            page: 2,
            perPage: 10,
        },
        topAiring: {
            page: 3,
            perPage: 5,
        },
        popularSeries: {
            page: 1,
            perPage: 5,
        },
        popularMovies: {
            page: 1,
            perPage: 5,
        },
        completedSeries: {
            page: 1,
            perPage: 5,
        },
        latestEpisodes: {
            page: 1,
            perPage: 10,
        },
        newlyAdded: {
            page: 1,
            perPage: 10,
        },
    }
    let fetchPromises = Object.keys(variables).map(x => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: queries[x],
                variables: variables[x]
            })
        }
        return fetch(url, options)
    })

    try {
        const responses = await Promise.all(fetchPromises)
        const dataArray = await Promise.all(responses.map(response => response.json()))

        let data = {};
        let index = 0;
        for (const catagory of Object.keys(variables)) {
            data[catagory] = dataArray[index++]
        }
        // write(data)
        return { status: 200, data }
    } catch (error) {
        return { status: 404, data: error }
    }
}

export const findAnimeList = async (animename) => {
    return { data: findAnime, status: 200 }
    const variables = {
        page: 1,
        perPage: 5,
        search: animename,
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: queries.findAnime,
            variables: variables
        })
    }
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        // write(data)
        return { status: 200, data }
    } catch (error) {
        return { status: 404, data: error }
    }
}

export const searchAnimeList = async ({
    pageno,
    animename,
    countryOfOrigin,
    format,
    season,
    genre,
    year,
    sort,
    status,
    averageScore
}) => {
    return { data: searchData, status: 200 }
    pageno = parseInt(pageno)
    if (pageno == NaN) {
        pageno = 1
    }
    const variables = {
        page: Math.max(pageno, 1),
        perPage: 21,
    }
    if (!animename || animename.trim() == '') {
        animename = null
    }
    if (!['JP', 'CN', 'KR'].includes(countryOfOrigin)) {
        countryOfOrigin = null
    }
    if (!['WINTER', 'SPRING', 'SUMMER', 'FALL'].includes(season)) {
        season = null
    }
    if (!['TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA'].includes(format)) {
        format = null
    }
    if (!Array.isArray(genre)) {
        if (genre == undefined) {
            genre = []
        } else {
            genre = [genre]
        }
    }
    genre = genre.map(x => (x + "").trim())
    year = parseInt(year)
    if (isNaN(year) || 1940 > year || year > 2024) {
        year = null
    }
    if (!['TITLE_ENGLISH', 'TITLE_ENGLISH_DESC', 'START_DATE_DESC', 'POPULARITY', 'POPULARITY_DESC'].includes(sort)) {
        sort = null
    }
    if (!['RELEASING', 'FINISHED', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS'].includes(status)) {
        status = null
    }
    averageScore = parseInt(averageScore)
    if (isNaN(averageScore)) {
        averageScore = null
    }
    const buildVariables = {
        search: animename,
        countryOfOrigin,
        season,
        format,
        genre_in: genre,
        seasonYear: year,
        sort,
        status,
        averageScore_greater: averageScore,
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: queries.searchAnime(buildVariables),
            variables: variables
        })
    }
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        // write(data)
        return { status: 200, data }
    } catch (error) {
        return { status: 404, data: error }
    }
}

export const animeDetails = async (id) => {
    return { data: sampleAnimeDetails, status: 200 }
    const variables = {
        id: id,
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: queries.animeDetails,
            variables: variables
        })
    }
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        // write(data.data.Media)
        return { status: 200, data: data.data.Media }
    } catch (error) {
        return { status: 404, data: error }
    }
}
