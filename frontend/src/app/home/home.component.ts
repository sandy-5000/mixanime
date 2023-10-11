import { Component } from '@angular/core'
import { AnilistService } from '../services/anilist/anilist.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent {

	loading: Boolean = false
	carouselData: any = []

	constructor() { }

	setNavButton() {
		const navs = document.querySelectorAll('.nav')
		navs.forEach(x => {
			x.classList.remove('bg-slate-800')
		})
		const navButtons = document.querySelectorAll('.home-nav')
		navButtons.forEach(x => {
			x.classList.add('bg-slate-800')
		})
	}

	async setCarousel() {
		const variables = {
			carousel: {
				page: 1,
				perPage: 10,
			},
		}
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				query: AnilistService.queries?.carousel || '',
				variables: variables.carousel
			})
		}
		const response = await fetch(AnilistService.url, options)
		const result = await response.json()
		this.carouselData = result.data.Page.media
		this.loading = false
	}

	ngOnInit(): void {
		this.loading = true
		this.setNavButton()
		this.setCarousel()
	}

}
