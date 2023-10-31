import { Component, ElementRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { SharedviewService } from '../services/sharedview/sharedview.service'
import { AnilistService } from '../services/anilist/anilist.service'

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
	@ViewChild('searchInputBig') searchInputBig: ElementRef | undefined
	@ViewChild('searchInputSml') searchInputSml: ElementRef | undefined

	searchBar: string = ''
	previousSearchBar: string = ''
	debounceSearch: any = undefined
	dataMethods: any = {}
	loading: any = {
		find: false
	}
	searchBG: Boolean = false
	searchData: any = []
	loggedIn: Boolean = false
	userName: string = ''

	constructor(
		private router: Router,
		private sharedView: SharedviewService
	) {
		this.dataMethods = AnilistService.fetcher()
		this.debounceSearch = this.getDebounce((search: string) => {
			search = search.trim()
			if (search === '' || this.previousSearchBar === search) {
				if (search === '') {
					this.searchBG = false
					this.searchData = []
				}
				this.loading.find = false
				return
			}
			this.dataMethods.get('find', {
				page: 1,
				perPage: 5,
				search: search
			}, (data: any) => {
				this.searchBG = data.length != 0
				this.searchData = data
				this.previousSearchBar = search
				this.loading.find = false
			})
		})
	}

	getDebounce(f: any): any {
		let instance: any = null
		return (...args: any[]) => {
			clearTimeout(instance)
			instance = setTimeout(() => {
				f(...args)
			}, 1000)
		}
	}

	searchBarChanged(event: Event) {
		this.loading.find = true
		this.debounceSearch(this.searchBar)
	}

	searchBGTap(elementToFocus: string) {
		this.searchBar = ''
		this.searchBG = false
		this.searchData = []
		this.previousSearchBar = ''
		if (elementToFocus === 'searchInputBig') {
			this.searchInputBig?.nativeElement.focus()
		} else if (elementToFocus === 'searchInputSml') {
			this.searchInputSml?.nativeElement.focus()
		}
	}

	toggleSearchBar() {
		const bar = document.querySelector('.small-search-hide')
		bar?.classList.toggle('small-search-show')
	}

	setNavButton(path: String) {
		const navs = document.querySelectorAll('.nav')
		navs.forEach(x => {
			x.classList.remove('bg-sgreen')
			x.classList.remove('text-slate-800')
		})
		const navButtons = document.querySelectorAll(`.${path}-nav`)
		navButtons.forEach(x => {
			x.classList.add('bg-sgreen')
			x.classList.add('text-slate-800')
		})
	}

	ngOnInit(): void {
		const methods: { [key: string]: (...args: any[]) => void } = {
			setNavButton: this.setNavButton,
			clearSearch: this.clearSearch,
			checkLogin: this.checkLogin,
		}
		this.checkLogin()
		try {
			this.sharedView.current.subscribe((data: any) => {
				methods[data.method](...data.params)
			})
		} catch (e) {
			console.error(e)
		}
	}

	goToRoute(path: string): void {
		this.router.navigateByUrl(path)
		this.clearSearch()
	}

	goToDetails(id: number) {
		this.sharedView.animeId = id
		this.sharedView.changeDetails(id)
		this.clearSearch()
		this.router.navigateByUrl('/details')
	}

	clearSearch(): void {
		this.previousSearchBar = ''
		this.searchBG = false
		this.searchData = []
	}

	checkLogin(): void {
		const token = localStorage.getItem('token') || null
		const userData = JSON.parse(localStorage.getItem('user-data') || '{}')
		if (!userData.email || (!userData.jwt && !token) || !userData.name) {
			return
		}
		this.loggedIn = true
		this.userName = userData.name
		document.querySelector('.login')?.classList.add('hidden')
		document.querySelector('.login')?.classList.remove('flex')
		document.querySelector('.logout')?.classList.remove('hidden')
		const userName = document.querySelector('.user-name')
		if (userName) {
			userName.innerHTML = userData.name
		}
	}

	logout() {
		document.querySelector('.login')?.classList.remove('hidden')
		document.querySelector('.login')?.classList.add('flex')
		document.querySelector('.logout')?.classList.add('hidden')
		localStorage.removeItem('user-data')
		localStorage.removeItem('token')
		this.router.navigateByUrl('/login')
	}

}
