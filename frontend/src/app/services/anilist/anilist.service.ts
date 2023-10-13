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
						bannerImage
						averageScore
					}
				}
			}
		`,
	}

	public static homePage() {
		return {
			carousel: (variables: any, callback: any) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					body: JSON.stringify({
						query: this.queries.carousel,
						variables: variables
					})
				}
				fetch(this.url, options)
					.then(response => response.json())
					.then(result => {
						const data = result.data.Page.media
						callback(data)
					})
			},
			recent: (variables: any, callback: any) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					body: JSON.stringify({
						query: this.queries.recent,
						variables: variables
					})
				}
				fetch(this.url, options)
					.then(response => response.json())
					.then(result => {
						const data = result.data.Page.media
						callback(data)
					})
			}
		}
	}

	constructor() { }

}
