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
	filterForm: any = {
		animename: '',
		countryOfOrigin: '',
		format: 'TV',
		season: '',
		genre: {},
		year: '',
		sort: 'TITLE_ENGLISH',
		status: '',
		averageScore: '50',
	}

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
			this.hideFilter()
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

	filter() {
		this.setEvents()
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
		let {
			animename,
			countryOfOrigin,
			format,
			season,
			genre,
			year,
			sort,
			status,
			averageScore
		} = this.filterForm

		if (!animename || animename.trim() == '') {
			animename = null
		}
		if (!['JP', 'CN', 'KR'].includes(countryOfOrigin)) {
			countryOfOrigin = null
		}
		if (!['WINTER', 'SPRING', 'SUMMER', 'FALL'].includes(season)) {
			season = null
		}
		if (!['TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA'].includes(format)) {
			format = null
		}
		genre = []
		for (let [k, v] of Object.entries(this.filterForm.genre)) {
			if (v) {
				genre.push(k)
			}
		}
		year = parseInt(year)
		if (isNaN(year) || 1940 > year || year > 2024) {
			year = null
		}
		if (!['TITLE_ENGLISH', 'TITLE_ENGLISH_DESC', 'START_DATE_DESC', 'POPULARITY', 'POPULARITY_DESC'].includes(sort)) {
			sort = null
		}
		if (!['RELEASING', 'FINISHED', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS'].includes(status)) {
			status = null
		}
		averageScore = parseInt(averageScore)
		if (isNaN(averageScore)) {
			averageScore = null
		}
		const build = {
			search: animename,
			countryOfOrigin,
			season,
			format,
			genre_in: genre,
			seasonYear: year,
			sort,
			status,
			averageScore_greater: averageScore,
		}
		this.loading.search = true
		this.dataMethods.get('search', { ...this.variables.search, build }, (data: any) => {
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
