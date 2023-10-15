import { Component } from '@angular/core'
import { SharedviewService } from '../../services/sharedview/sharedview.service'
import { AnilistService } from 'src/app/services/anilist/anilist.service'

@Component({
	selector: 'app-recent',
	templateUrl: './recent.component.html',
	styleUrls: ['./recent.component.css']
})
export class RecentComponent {

	constructor(private sharedView: SharedviewService) {
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
		this.currentPage = 1
		this.dataMethods = AnilistService.fetcher()
	}

	loading: any = {
		recent: true,
	}
	dataMethods: any = {}
	date: any = null
	recentData: any = []
	currentPage: number = 0

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

}
