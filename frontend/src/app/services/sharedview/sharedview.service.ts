import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SharedviewService {

	current = new Observable(observer => {
		this.observer = observer
	})
	observer: any = null

	constructor() { }

	changeState(data: any) {
		this.observer?.next(data)
	}

}
