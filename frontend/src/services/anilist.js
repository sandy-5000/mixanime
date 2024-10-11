const URL = 'https://graphql.anilist.co'

const queries = {
  carousel: `
			query ($page: Int, $perPage: Int, $search: String) {
				Page(page: $page, perPage: $perPage) {
					media(search: $search, type: ANIME, sort: TRENDING_DESC) {
						id
						title {
							english
							romaji
							userPreferred
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
  recent: `
			query ($page: Int, $perPage: Int) {
				Page(page: $page, perPage: $perPage) {
					airingSchedules(notYetAired: false, sort: TIME_DESC) {
						id
						airingAt
						episode
						media {
							id
							title {
								romaji
								english
								userPreferred
								native
							}
							countryOfOrigin
							format
							duration
							genres
							description
							bannerImage
							coverImage {
								extraLarge
								large
							}
						}
					}
				}
			}
		`,
  season: `
			query ($seasonYear: Int, $season: MediaSeason, $page: Int, $perPage: Int, $search: String) {
				Page(page: $page, perPage: $perPage) {
					media(search: $search, seasonYear: $seasonYear, season: $season, isAdult: false, countryOfOrigin: JP, type: ANIME, sort: TRENDING_DESC) {
						id
						title {
							english
							romaji
							userPreferred
							native
						}
						format
						duration
						startDate {
							year
							month
							day
						}
						nextAiringEpisode {
							episode
							timeUntilAiring
						}
						episodes
						updatedAt
						description
						coverImage {
							large
							extraLarge
						}
						bannerImage
						averageScore
					}
				}
			}
		`,
  find: `
			query ($page: Int, $perPage: Int, $search: String) {
				Page(page: $page, perPage: $perPage) {
					media(search: $search, type: ANIME, sort: TRENDING_DESC) {
						id
						title {
							english
							romaji
							userPreferred
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
  details: `
			query ($id: Int) {
				Media(id: $id) {
					id
					title {
						english
						romaji
						userPreferred
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
					recommendations(page: 1, perPage: 6, sort: RATING_DESC) {
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
  watch: `
			query ($id: Int) {
				Media(id: $id) {
					id
					title {
						english
						romaji
						userPreferred
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
  search: function (build) {
    let x = []
    for (const [k, v] of Object.entries(build)) {
      if (k == 'genre_in' || v == null) {
        continue
      }
      if (k == 'search') {
        x.push(`${k}: "${v}"`)
      } else {
        x.push(`${k}: ${v}`)
      }
    }
    if (build.genre_in.length > 0) {
      x.push('genre_in: ["' + build.genre_in.join('", "') + '"]')
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
							romaji
							english
							userPreferred
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
  schedule: `
			query ($page: Int, $perPage: Int, $airingAtGreater: Int, $airingAtLesser: Int) {
				Page(page: $page, perPage: $perPage) {
					airingSchedules(airingAt_greater: $airingAtGreater, airingAt_lesser: $airingAtLesser,  sort: TIME) {
						id
						airingAt
						episode
						media {
							id
							title {
								romaji
								english
								userPreferred
								native
							}
							countryOfOrigin
							format
							duration
							genres
							description
							bannerImage
							coverImage {
								extraLarge
								large
							}
						}
					}
				}
			}
		`,
}

const Anilist = (query, variables, callback) => {
  const key = query + '-' + JSON.stringify(variables)
  let cacheData = localStorage.getItem(key)
  if (cacheData) {
    cacheData = JSON.parse(cacheData)
    if (
      cacheData.time &&
      cacheData.time + 900000 /* 15mins in millisecs */ > Date.now()
    ) {
      callback(cacheData.result)
      return
    }
  }
  const build = variables.build
  delete variables.build
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: build ? queries[query](build) : queries[query],
      variables: variables,
    }),
  }
  fetch(URL, options)
    .then((response) => response.json())
    .then((result) => {
      if (query == 'recent' || query == 'schedule') {
        result = result.data.Page.airingSchedules
      } else if (query == 'details') {
        result = result.data.Media
      } else if (query == 'watch') {
        result = result.data.Media
      } else {
        result = result.data.Page.media
      }
      localStorage.setItem(key, JSON.stringify({ time: Date.now(), result }))
      callback(result)
    })
}

export default Anilist
