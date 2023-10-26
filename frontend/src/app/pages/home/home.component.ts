import { Component } from '@angular/core'
import { AnilistService } from '../../services/anilist/anilist.service'
import { SharedviewService } from '../../services/sharedview/sharedview.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent {

	constructor(private sharedView: SharedviewService, private router: Router) {
		this.date = (x: number) => {
			let p: any = new Date(x * 1000)
			let dateExtention = 'th', date = p.getDate()
			if (date < 11 || 13 < date) {
				if (date % 10 == 1) {
					dateExtention = 'st'
				} else if (date % 10 == 2) {
					dateExtention = 'nd'
				} else if (date % 10 == 3) {
					dateExtention = 'rd'
				}
			}
			return date + dateExtention + ' ' + p.toString().slice(4, 7) + ' ' + p.toString().slice(16, 21)
		}
		this.dataMethods = AnilistService.fetcher()
	}

	loading: any = {
		carousel: true,
		recent: true,
		season: true,
	}
	dataMethods: any = {}
	unSubscribeEvents: any = []
	date: any = null

	carouselData: any = []
	recentData: any = []
	seasonData: any = []

	variables: any = {
		carousel: {
			page: 1,
			perPage: 10,
		},
		recent: {
			page: 1,
			perPage: 48,
		},
		season: {
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
				const observerHeader = new IntersectionObserver(entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							entry.target.classList.add('a-yslide-show')
						} else {
							entry.target.classList.remove('a-yslide-show')
						}
					})
				})
				const observerDescription = new IntersectionObserver(entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							entry.target.classList.add('a-xslide-show')
						} else {
							entry.target.classList.remove('a-xslide-show')
						}
					})
				})
				const hiddenElementsY = document.querySelectorAll('.a-yslide-hidden')
				hiddenElementsY.forEach(element => observerHeader.observe(element))
				const hiddenElementsX = document.querySelectorAll('.a-xslide-hidden')
				hiddenElementsX.forEach(element => observerDescription.observe(element))
			}
			this.carouselData = data
			setTimeout(() => {
				startCarousel()
				addAnimation()
			}, 100)
			this.loading.carousel = false
		},
		recent: (data: any) => {
			const addAnimation = () => {
				const observerRecent = new IntersectionObserver(entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							const delay = entry.target.getAttribute('delay')
							setTimeout(() => {
								entry.target.classList.add('show-recent-card')
							}, parseInt(delay || '0'))
						} else {
							entry.target.classList.remove('show-recent-card')
						}
					})
				})
				const hiddenElements = document.querySelectorAll('.hidden-recent-card')
				hiddenElements.forEach((element, i) => {
					element.setAttribute('delay', (0 * (i + 1)) + '')
					observerRecent.observe(element)
				})
			}
			setTimeout(() => {
				addAnimation()
			}, 100)
			this.recentData = data.filter((x: any) => x.media.countryOfOrigin === 'JP').slice(0, 24)
			this.loading.recent = false
		},
		season: (data: any) => {
			const addAnimation = () => {
				const observerRecent = new IntersectionObserver(entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							const delay = entry.target.getAttribute('delay')
							setTimeout(() => {
								entry.target.classList.add('show-season-card')
							}, parseInt(delay || '0'))
						} else {
							entry.target.classList.remove('show-season-card')
						}
					})
				})
				const hiddenElements = document.querySelectorAll('.hidden-season-card')
				hiddenElements.forEach((element, i) => {
					element.setAttribute('delay', (100 * (i % 6 + 1)) + '')
					observerRecent.observe(element)
				})
			}
			setTimeout(() => {
				addAnimation()
			}, 100)
			this.seasonData = data
			this.loading.season = false
		},
	}

	scrollLeft() {
		const recent = document.querySelector('.recent-container') || document.body
		recent.scrollLeft -= 500
	}
	scrollRight() {
		const recent = document.querySelector('.recent-container') || document.body
		recent.scrollLeft += 550
	}

	setEvents() {
		this.loading.carousel = true
		this.dataMethods.get('carousel', this.variables.carousel, (data: any) => {
			this.setPageData.carousel(data)
		})

		this.loading.recent = true
		this.dataMethods.get('recent', this.variables.recent, (data: any) => {
			this.setPageData.recent(data)
		})

		const data = new Date()
		const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL']
		this.variables.season.seasonYear = data.getFullYear()
		this.variables.season.season = seasons[Math.floor(data.getMonth() / 3)]
		this.loading.season = true
		this.dataMethods.get('season', this.variables.season, (data: any) => {
			this.setPageData.season(data)
		})
	}

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['home']
		})
		this.setEvents()
	}

	goToRoute(path: string) {
		this.router.navigateByUrl(path)
	}

	goToDetails(id: number) {
		this.sharedView.animeId = id
		this.sharedView.changeDetails(id)
		this.router.navigateByUrl('/details')
	}

	goToWatch(id: number, title: string, episode: number) {
		this.sharedView.episode = episode
		this.router.navigate(
			['/watch'],
			{
				queryParams: { id, title }
			}
		)
	}

	ngOnDestroy(): void {
		for (let event of this.unSubscribeEvents) {
			event.close()
		}
	}

}
