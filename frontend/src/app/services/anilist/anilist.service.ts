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
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					body: JSON.stringify({
						query: this.queries[query],
						variables: variables
					})
				}
				fetch(this.url, options)
					.then(response => response.json())
					.then(result => {
						if (query == 'recent') {
							result = result.data.Page.airingSchedules
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
