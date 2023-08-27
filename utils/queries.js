export const queries = {
    // home page
    carousel: `
        query ($page: Int, $perPage: Int, $search: String) {
            Page(page: $page, perPage: $perPage) {
                media(search: $search, type: ANIME, sort: TRENDING_DESC) {
                    id
                    title {
                        english
						romaji
                        native
                    }
                    startDate {
                        year
                        month
                        day
                    }
                    trending
                    popularity
                    status
                    duration
                    description
                    episodes
                    coverImage {
                        extraLarge
                    }
                    bannerImage
                }
            }
        }
    `,
    trending: `
        query ($page: Int, $perPage: Int, $search: String) {
            Page(page: $page, perPage: $perPage) {
                media(search: $search, type: ANIME, sort: TRENDING_DESC) {
                    id
                    title {
                        english
						romaji
                        native
                    }
                    coverImage {
                        large
                        extraLarge
                    }
                }
            }
        }
    `,
    topAiring: `
        query ($page: Int, $perPage: Int, $search: String) {
            Page(page: $page, perPage: $perPage) {
                media(search: $search, type: ANIME, sort: TRENDING_DESC) {
                    id
                    title {
                        english
						romaji
                        native
                    }
                    format
                    duration
                    episodes
                    nextAiringEpisode {
                        episode
                    }
                    description
                    coverImage {
                        medium
                    }
                    averageScore
                }
            }
        }
    `,
    popularSeries: `
        query ($page: Int, $perPage: Int, $search: String) {
            Page(page: $page, perPage: $perPage) {
                media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
                    id
                    title {
                        english
						romaji
                        native
                    }
                    format
                    duration
                    episodes
                    nextAiringEpisode {
                        episode
                    }
                    description
                    coverImage {
                        medium
                    }
                    averageScore
                }
            }
        }
    `,
    popularMovies: `
        query ($page: Int, $perPage: Int, $search: String) {
            Page(page: $page, perPage: $perPage) {
                media(search: $search, format: MOVIE, sort: POPULARITY_DESC) {
                    id
                    title {
                        english
						romaji
                        native
                    }
                    format
                    duration
                    episodes
                    nextAiringEpisode {
                        episode
                    }
                    description
                    coverImage {
                        medium
                    }
                    averageScore
                }
            }
        }
    `,
    completedSeries: `
        query ($page: Int, $perPage: Int, $search: String) {
            Page(page: $page, perPage: $perPage) {
                media(search: $search, type: ANIME, status: FINISHED, sort: POPULARITY_DESC) {
                    id
                    title {
                        english
						romaji
                        native
                    }
                    format
                    duration
                    episodes
                    nextAiringEpisode {
                        episode
                    }
                    description
                    coverImage {
                        medium
                    }
                    averageScore
                }
            }
        }
    `,
    latestEpisodes: `
        query ($page: Int, $perPage: Int, $search: String) {
            Page(page: $page, perPage: $perPage) {
                media(search: $search, isAdult: false, popularity_greater: 25000, countryOfOrigin: JP, type: ANIME, status: RELEASING, sort: UPDATED_AT_DESC) {
                    id
                    title {
                        english
						romaji
                        native
                    }
                    format
                    duration
                    episodes
                    nextAiringEpisode {
                        episode
                    }
                    updatedAt
                    description
                    coverImage {
                        large
                        extraLarge
                    }
                    averageScore
                }
            }
        }
    `,
    newlyAdded: `
        query ($page: Int, $perPage: Int, $search: String) {
            Page(page: $page, perPage: $perPage) {
                media(search: $search, isAdult: false, popularity_greater: 20000, countryOfOrigin: JP, type: ANIME, status: RELEASING, sort: START_DATE_DESC) {
                    id
                    title {
                        english
						romaji
                        native
                    }
                    format
                    duration
                    episodes
                    nextAiringEpisode {
                        episode
                    }
                    updatedAt
                    description
                    coverImage {
                        large
                        extraLarge
                    }
                    averageScore
                }
            }
        }
    `,

    // find anime
    findAnime: `
        query ($page: Int, $perPage: Int, $search: String) {
            Page(page: $page, perPage: $perPage) {
                media(search: $search, type: ANIME, sort: TRENDING_DESC) {
                    id
                    title {
                        english
						romaji
                        native
                    }
                    startDate {
                        year
                    }
                    format
                    status
                    episodes
                    coverImage {
                        large
                    }
                }
            }
        }
    `,

    // search anime
    searchAnime: function (buildVariables) {
        let x = []
        for (const [k, v] of Object.entries(buildVariables)) {
            if (k == 'genre_in' || v == null) {
                continue
            }
            if (k == 'search') {
                x.push(`${k}: "${v}"`)
            } else {
                x.push(`${k}: ${v}`)
            }
        }
        if (buildVariables.genre_in.length > 0) {
            x.push('genre_in: ["' + buildVariables.genre_in.join('", "') + '"]')
        }
        return `
        query ($page: Int, $perPage: Int) {
            Page(page: $page, perPage: $perPage) {
                pageInfo {
					total
					currentPage
					lastPage
					hasNextPage
					perPage
				}
                media(type: ANIME, ${x.join(', ')}) {
                    id
                    title {
                        english
                        native
                    }
                    startDate {
                        year
                        month
                    }
                    format
                    status
                    duration
                    episodes
                    nextAiringEpisode {
                        episode
                    }
                    updatedAt
                    description
                    coverImage {
                        extraLarge
                    }
                    averageScore
                }
            }
        }
        `
    },

    // anime details
    animeDetails: `
        query ($id: Int) {
            Media(id: $id) {
                id
                title {
                    english
                    romaji
                    native
                }
                startDate {
                    year
                    month
                    day
                }
                season
                type
                format
                status
                episodes
                favourites
                synonyms
                relations {
                    nodes {
                        id
                        type
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            large
                        }
                    }
                }
                recommendations(page: 1, perPage: 5, sort: RATING_DESC) {
                    nodes {
                        mediaRecommendation {
                            id
                            title {
                                romaji
                                english
                            }
                            coverImage {
                                large
                            }
                        }
                    }
                }
                nextAiringEpisode {
                    episode
                }
                duration
                genres
                averageScore
                description
                coverImage {
                    extraLarge
                }
                bannerImage
            }
        }
    `,
}
