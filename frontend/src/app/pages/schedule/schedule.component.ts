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
		this.truncate = (longString: any, length: number) => {
			if (!longString) {
				return 'No synopsis Avaliable.'
			}
			if (longString?.length > length - 3) {
				return longString.slice(0, length - 3) + '...'
			}
			return longString
		}
	}

	range: any = new Array(7).fill(null).map((_, index: number) => index)
	loading: any = {
		schedule: true,
	}
	dataMethods: any = {}
	date: any = null
	truncate: any = null
	scheduleDays: any = new Array(7).fill(null).map((_, index: number) => index)
	scheduleData: any = new Array(7).fill(null)
	scheduleHead: any = new Array(7).fill(null)
	variables: any = {
		schedule: {
			page: 1,
			perPage: 50,
		},
	}
	shift: number = -1

	setPageData: any = {
		schedule: (data: any, current: Date, index: number) => {
			this.scheduleHead[index] = current.toString().slice(0, 15)
			this.scheduleData[index] = data.filter((x: any) => x.media.countryOfOrigin != 'CN')
		}
	}

	setEvents(index: number, head: boolean = false) {
		const current = new Date()
		current.setDate(current.getDate() + index + this.shift)
		this.scheduleHead[index] = current.toString().slice(0, 15)
		if (head) {
			return
		}
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
			this.setPageData.schedule(data, current, index)
		})
	}

	showEvent(index: number) {
		document.querySelector(`.schedule-${index}`)?.classList.remove('hidden')
		setTimeout(() => {
			document.querySelector(`.schedule-${index}`)?.classList.add('show-day-schedule')
		}, 200)
		this.setEvents(index)
	}

	hideEvent(index: number) {
		setTimeout(() => {
			this.scheduleData[index] = null
			document.querySelector(`.schedule-${index}`)?.classList.add('hidden')
		}, 200)
		document.querySelector(`.schedule-${index}`)?.classList.remove('show-day-schedule')
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
		for (let i = 0; i < 7; ++i) {
			this.setEvents(i, true)
		}
		setTimeout(() => {
			this.loading.schedule = false	
		}, 300)
		setTimeout(() => {
			this.showEvent(1)
		}, 500)
	}

}
