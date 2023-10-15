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
							const data = result.data.Page.airingSchedules
							callback(data)
						} else {
							const data = result.data.Page.media
							callback(data)
						}
					})
			},
		}
	}

	constructor() { }

}
