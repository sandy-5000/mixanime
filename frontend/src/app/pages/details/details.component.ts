import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AnilistService } from 'src/app/services/anilist/anilist.service'
import { SharedviewService } from 'src/app/services/sharedview/sharedview.service'

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent {

	id: number = 21

	constructor(
		private sharedView: SharedviewService,
		private router: Router
	) {
		this.dataMethods = AnilistService.fetcher()
		this.date = (year: number, month: number, day: number) => {
			let p: any = new Date(year, month - 1, day)
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
			return date + dateExtention + ' ' + p.toString().slice(4, 7) + ', ' + p.getFullYear()
		}
	}

	item: any = null
	dataMethods: any = {}
	date: any = null

	setPageData: any = {
		details: (data: any) => {
			data.relations.nodes = data.relations.nodes
				.filter((x: any) => x.type == 'ANIME' || x.type == 'MOVIE')
			this.item = data
		}
	}

	fetchData() {
		this.item = null
		this.dataMethods.get('details', { id: this.id }, (data: any) => {
			this.setPageData.details(data)
		})
	}

	ngOnInit() {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['details']
		})
		this.sharedView.changeState({
			method: 'checkLogin',
			params: []
		})
		try {
			this.id = parseInt(localStorage.getItem('animeId') || '21')
			setTimeout(() => {
				this.fetchData()
			}, 100)
			this.sharedView.currentDetails.subscribe((data: any) => {
				this.id = parseInt(data) || 21
				this.fetchData()
			})
		} catch (e) {
			console.error(e)
		}
	}

	goToDetails(id: number) {
		this.sharedView.animeId = id
		this.sharedView.changeDetails(id)
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

}
