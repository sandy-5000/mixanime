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
						query: this.queries?.carousel || '',
						variables: variables
					})
				}
				fetch(AnilistService.url, options)
					.then(response => response.json())
					.then(result => {
						const data = result.data.Page.media
						callback(data)
					})
			},
		}
	}

	constructor() { }

}
