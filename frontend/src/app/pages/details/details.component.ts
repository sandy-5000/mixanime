import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnilistService } from 'src/app/services/anilist/anilist.service';
import { SharedviewService } from 'src/app/services/sharedview/sharedview.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent {

	id: number = 21

	constructor(
		private sharedView: SharedviewService
	) {
		this.dataMethods = AnilistService.fetcher()
	}

	item: any = {}
	dataMethods: any = {}

	setPageData: any = {
		details: (data: any) => {
			this.item = data
			console.log(this.item)
		}
	}

	fetchData() {
		this.dataMethods.get('details', { id: this.id }, (data: any) => {
			this.setPageData.details(data)
		})
	}

	ngOnInit() {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['details']
		})
		try {
			this.id = this.sharedView.animeId
			this.fetchData()
			this.sharedView.currentDetails.subscribe((data: any) => {
				this.id = parseInt(data) || 21
				this.fetchData()
			})
		} catch (e) {
			console.error(e)
		}
	}

}
