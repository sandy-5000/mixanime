import { Component } from '@angular/core'
import { SharedviewService } from '../../services/sharedview/sharedview.service'
import { AnilistService } from 'src/app/services/anilist/anilist.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-trending',
	templateUrl: './trending.component.html',
	styleUrls: ['./trending.component.css']
})
export class TrendingComponent {

	constructor(
		private router: Router,
		private sharedView: SharedviewService
	) {
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
		season: true,
	}
	dataMethods: any = {}
	date: any = null

	seasonData: any = []

	variables: any = {
		season: {
			page: 1,
			perPage: 24,
		},
	}

	setPageData: any = {
		season: (data: any) => {
			const addAnimation = () => {
				const observerseason = new IntersectionObserver(entries => {
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
					observerseason.observe(element)
				})
			}
			setTimeout(() => {
				addAnimation()
			}, 100)
			this.seasonData = data
			this.loading.season = false
		},
	}

	modal: boolean = false
	inputPageNo: number = 1

	showModal() {
		this.modal = true
	}

	hideModal() {
		this.modal = false
	}

	prevPage() {
		if (this.inputPageNo <= 1) {
			return
		}
		this.inputPageNo -= 1
		this.submitPage()
	}

	nextPage() {
		if (this.seasonData.length < 24) {
			return
		}
		if (isNaN(this.inputPageNo) || this.inputPageNo < 1) {
			this.inputPageNo = 1
		}
		this.inputPageNo += 1
		this.submitPage()
	}

	pageNoOnChange(event: Event) {
		const input = event.target as HTMLInputElement
		this.inputPageNo = parseInt(input.value)
		if (isNaN(this.inputPageNo) || this.inputPageNo < 1) {
			input.value = ''
		}
	}

	submitPage() {
		if (isNaN(this.inputPageNo) || this.inputPageNo < 1) {
			this.inputPageNo = 1
		}
		this.hideModal()
		this.seasonData = []
		this.variables.season.page = this.inputPageNo
		this.setEvents()
	}


	setEvents() {
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
			params: ['trending']
		})
		this.sharedView.changeState({
			method: 'checkLogin',
			params: []
		})
		this.setEvents()
	}

	goToDetails(id: number) {
		this.sharedView.animeId = id
		this.sharedView.changeDetails(id)
		this.router.navigateByUrl('/details')
	}

}
