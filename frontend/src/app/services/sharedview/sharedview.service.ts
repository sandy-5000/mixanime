import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class SharedviewService {

	current = new Observable(observer => {
		this.observer = observer
	})
	observer: any = null

	currentDetails = new Observable(observer => {
		this.detailsId = observer
	})
	detailsId: any = null
	animeId: number = 21

	episode: number = 1

	constructor() { }

	changeState(data: any) {
		this.observer?.next(data)
	}

	changeDetails(data: any) {
		this.animeId = parseInt(data) || 21
		localStorage.setItem('animeId', this.animeId + '')
		this.detailsId?.next(data)
	}

}
