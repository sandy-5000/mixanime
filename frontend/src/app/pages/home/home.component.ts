import { Component } from '@angular/core'
import { AnilistService } from '../../services/anilist/anilist.service'
import { SharedviewService } from '../../services/sharedview/sharedview.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent {

	constructor(private sharedView: SharedviewService) {
		this.dataMethods = AnilistService.homePage()
	}

	loading: any = {
		carousel: true,
		recent: true,
	}
	dataMethods: any = {}
	unSubscribeEvents: any = []

	carouselData: any = []
	recentData: any = []

	variables: any = {
		carousel: {
			page: 1,
			perPage: 10,
		},
		recent: {
			page: 1,
			perPage: 12,
		},
	}

	setPageData: any = {
		carousel: (data: any) => {
			if (this.carouselData.length != 0) {
				this.loading.carousel = false
				return
			}
			const startCarousel = () => {
				let index = 1
				const n = this.carouselData.length
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
			this.carouselData = data
			setTimeout(() => {
				startCarousel()
				addAnimation()
			}, 100)
			this.loading.carousel = false
		},
		recent: (data: any) => {
			this.recentData = data
			this.loading.recent = false
		}
	}

	setEvents() {
		this.loading.carousel = true
		this.dataMethods.carousel(this.variables.carousel, (data: any) => {
			this.setPageData.carousel(data)
		})
		this.loading.recent = true
		this.dataMethods.recent(this.variables.recent, (data: any) => {
			this.setPageData.recent(data)
		})
	}

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['home']
		})
		this.setEvents()
	}

	ngOnDestroy(): void {
		for (let event of this.unSubscribeEvents) {
			event.close()
		}
	}

}
