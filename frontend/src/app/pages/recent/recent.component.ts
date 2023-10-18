import { Component } from '@angular/core'
import { SharedviewService } from '../../services/sharedview/sharedview.service'
import { AnilistService } from 'src/app/services/anilist/anilist.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-recent',
	templateUrl: './recent.component.html',
	styleUrls: ['./recent.component.css']
})
export class RecentComponent {

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
		recent: true,
	}
	dataMethods: any = {}
	date: any = null
	recentData: any = []

	variables: any = {
		recent: {
			page: 1,
			perPage: 24,
		},
	}

	setPageData: any = {
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
					element.setAttribute('delay', (50 * (i % 4 + 1)) + '')
					observerRecent.observe(element)
				})
			}
			setTimeout(() => {
				addAnimation()
			}, 100)
			this.recentData = data
			this.loading.recent = false
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
		if (this.recentData.length < 24) {
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
		console.log(this.inputPageNo, 'Submit')
		this.hideModal()
		this.recentData = []
		this.variables.recent.page = this.inputPageNo
		this.setEvents()
	}

	setEvents() {
		this.loading.recent = true
		this.dataMethods.get('recent', this.variables.recent, (data: any) => {
			this.setPageData.recent(data)
		})
	}

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['recent']
		})
		this.setEvents()
	}

	goToRoute(path: string): void {
		this.router.navigateByUrl(path)
	}

	goToDetails(id: number) {
		this.sharedView.animeId = id
		this.sharedView.changeDetails(id)
		this.router.navigateByUrl('/details')
	}

}
