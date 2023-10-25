import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class AnilistService {

	public static readonly url: string = 'https://graphql.anilist.co'

	public static readonly queries: any = {
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
								native
							}
							countryOfOrigin
							format
							duration
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
						native
						userPreferred
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
						native
						userPreferred
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
		search: function(build: any) {
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
	}

	public static fetcher() {
		return {
			get: (query: string, variables: any, callback: any) => {
				// temp cache start
				const key = query + '-' + JSON.stringify(variables)
				const cacheData = localStorage.getItem(key)
				if (cacheData) {
					console.log('cache data', key)
					callback(JSON.parse(cacheData))
					return
				}
				// temp cache end
				const build = variables.build
				delete variables.build
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					body: JSON.stringify({
						query: build ? this.queries[query](build) : this.queries[query],
						variables: variables
					})
				}
				fetch(this.url, options)
					.then(response => response.json())
					.then(result => {
						if (query == 'recent') {
							result = result.data.Page.airingSchedules
						} else if (query == 'details') {
							result = result.data.Media
						} else if (query == 'watch') {
							result = result.data.Media
						} else {
							result = result.data.Page.media
						}
						// temp cache start
						localStorage.setItem(key, JSON.stringify(result))
						// temp cache end
						callback(result)
					})
			},
		}
	}

	constructor() { }

}
