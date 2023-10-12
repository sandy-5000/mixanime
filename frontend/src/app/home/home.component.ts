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
	unSubscribeEvents: any = []

	constructor() { }

	setNavButton() {
		const navs = document.querySelectorAll('.nav')
		navs.forEach(x => {
			x.classList.remove('bg-sgreen')
			x.classList.remove('text-slate-800')
		})
		const navButtons = document.querySelectorAll('.home-nav')
		navButtons.forEach(x => {
			x.classList.add('bg-sgreen')
			x.classList.add('text-slate-800')
		})
	}

	setEvents() {
		const setCarousel = async () => {

			if (this.carouselData.length != 0) {
				console.log(this.carouselData)
				this.loading = false
				return
			}
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

			const startCarousel = () => {
				let index = 1
				const n = variables.carousel.perPage
				const carouselLoop = setInterval(() => {
					let previous = (index + n - 1) % n
					const previousElement = document.querySelector(`.slide-${previous}`)
					const element = document.querySelector(`.slide-${index}`)
					element?.classList.remove('hidden')
					setTimeout(() => {
						previousElement?.classList.remove('the-thing')
						element?.classList.add('the-thing')
						setTimeout(() => {
							previousElement?.classList.add('hidden')
						}, 800)
					}, 800)
					index = (index + 1) % n
				}, 5000)
				this.unSubscribeEvents.push({
					close: () => clearInterval(carouselLoop)
				})
			}
			startCarousel()

			const addAnimation = () => {
				const observerX = new IntersectionObserver(entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							entry.target.classList.add('a-xslide-show')
						} else {
							entry.target.classList.remove('a-xslide-show')
						}
					})
				})
				const observerY = new IntersectionObserver(entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							entry.target.classList.add('a-yslide-show')
						} else {
							entry.target.classList.remove('a-yslide-show')
						}
					})
				})
				const hiddenElementsY = document.querySelectorAll('.a-yslide-hidden')
				hiddenElementsY.forEach(element => observerY.observe(element))
				const hiddenElementsX = document.querySelectorAll('.a-xslide-hidden')
				hiddenElementsX.forEach(element => observerX.observe(element))
			}
			setTimeout(() => {
				addAnimation()
			}, 100)

			this.loading = false
		}

		setCarousel()

	}

	ngOnInit(): void {
		this.loading = true
		this.setNavButton()
		this.setEvents()
	}

	ngOnDestroy(): void {
		for (let event of this.unSubscribeEvents) {
			event.close()
		}
	}

}
