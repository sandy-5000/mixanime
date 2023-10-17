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
				console.log(data)
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
			setNavButton: this.setNavButton
		}
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
		this.previousSearchBar = ''
		this.searchBG = false
		this.searchData = []
	}

}
