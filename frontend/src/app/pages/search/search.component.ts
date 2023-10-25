import { Component } from '@angular/core'
import { SharedviewService } from '../../services/sharedview/sharedview.service'
import { Router } from '@angular/router'
import { AnilistService } from 'src/app/services/anilist/anilist.service'

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent {

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
		this.genres = this.genres.map((x: any) => {
			return {
				name: x,
				color: this.getColor()
			}
		})
		let date = new Date()
		this.years = []
		for (let i = 1939; i <= date.getFullYear() + 1; ++i) {
			this.years.push(i)
		}
		this.dataMethods = AnilistService.fetcher()
	}

	loading: any = {
		search: true,
	}
	genres: any = [
		'Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music',
		'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice Of Life', 'Sports', 'Supernatural', 'Thriller'
	]
	dataMethods: any = {}
	date: any = null
	years: any = []

	searchData: any = []

	variables: any = {
		search: {
			page: 1,
			perPage: 24,
		},
	}

	setPageData: any = {
		search: (data: any) => {
			const addAnimation = () => {
				const observersearch = new IntersectionObserver(entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							const delay = entry.target.getAttribute('delay')
							setTimeout(() => {
								entry.target.classList.add('show-search-card')
							}, parseInt(delay || '0'))
						} else {
							entry.target.classList.remove('show-search-card')
						}
					})
				})
				const hiddenElements = document.querySelectorAll('.hidden-search-card')
				hiddenElements.forEach((element, i) => {
					element.setAttribute('delay', (100 * (i % 6 + 1)) + '')
					observersearch.observe(element)
				})
			}
			setTimeout(() => {
				addAnimation()
			}, 100)
			this.searchData = data
			this.loading.search = false
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
		if (this.searchData.length < 24) {
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

	showFilter() {
		document.getElementById('filter')?.classList.add('show-filter')
	}

	hideFilter() {
		document.getElementById('filter')?.classList.remove('show-filter')
	}

	submitPage() {
		if (isNaN(this.inputPageNo) || this.inputPageNo < 1) {
			this.inputPageNo = 1
		}
		this.hideModal()
		this.searchData = []
		this.variables.search.page = this.inputPageNo
		this.setEvents()
	}

	setEvents() {
		const data = new Date()
		const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL']
		this.variables.search.seasonYear = data.getFullYear()
		this.variables.search.season = seasons[Math.floor(data.getMonth() / 3)]
		this.loading.search = true
		this.dataMethods.get('season', this.variables.search, (data: any) => {
			this.setPageData.search(data)
		})
	}

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['search']
		})
		this.setEvents()
	}

	getColor() {
		const randomInt = (min: number, max: number) => {
			return Math.floor(Math.random() * (max - min + 1)) + min
		}
		var h = randomInt(0, 360)
		var s = randomInt(75, 100)
		var l = randomInt(70, 90)
		return `hsl(${h},${s}%,${l}%)`
	}

	goToDetails(id: number) {
		this.sharedView.animeId = id
		this.sharedView.changeDetails(id)
		this.router.navigateByUrl('/details')
	}

}
