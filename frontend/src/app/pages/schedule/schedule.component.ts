import { Component } from '@angular/core';
import { AnilistService } from 'src/app/services/anilist/anilist.service';
import { SharedviewService } from 'src/app/services/sharedview/sharedview.service';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {

	constructor(private sharedView: SharedviewService) {
		this.dataMethods = AnilistService.fetcher()
	}

	loading: any = {
		recent: true,
	}
	dataMethods: any = {}
	date: any = null
	scheduleData: any = new Array(7).fill(null)

	variables: any = {
		schedule: {
			page: 1,
			perPage: 50,
		},
	}

	setPageData: any = {
		schedule: (data: any, current: Date) => {
			console.log(current, data)
		}
	}

	setEvents() {
		this.loading.schedule = true
		for (let i = 0; i < 7; ++i) {
			const current = new Date()
			current.setDate(current.getDate() + i)
			const today = new Date(current.getFullYear(), current.getMonth(), current.getDate())
			const tomorrow = new Date(today)
			tomorrow.setDate(tomorrow.getDate() + 1)
			const airingAtGreater = Math.floor(today.getTime() / 1000) - 1
			const airingAtLesser = Math.floor(tomorrow.getTime() / 1000)
			this.dataMethods.get('schedule', {
				...this.variables.schedule,
				airingAtGreater,
				airingAtLesser
			}, (data: any) => {
				this.setPageData.schedule(data, current)
			})
		}
	}

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['schedule']
		})
		this.sharedView.changeState({
			method: 'checkLogin',
			params: []
		})
		this.setEvents()
	}

}
