import { Component } from '@angular/core';
import { SharedviewService } from '../../services/sharedview/sharedview.service';
import { AnilistService } from 'src/app/services/anilist/anilist.service';

@Component({
	selector: 'app-trending',
	templateUrl: './trending.component.html',
	styleUrls: ['./trending.component.css']
})
export class TrendingComponent {

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
		this.setEvents()
	}

}
