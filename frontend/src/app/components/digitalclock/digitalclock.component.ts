import { Component } from '@angular/core';

@Component({
	selector: 'app-digitalclock',
	templateUrl: './digitalclock.component.html',
	styleUrls: ['./digitalclock.component.css']
})
export class DigitalclockComponent {

	constructor() { }

	currentTime: any = ''

	ngOnInit(): void {
		const startTime = () => {
			const today = new Date()
			let h: any = today.getHours()
			let m: any = today.getMinutes()
			let s: any = today.getSeconds()
			h = h < 10 ? '0' + h : h
			m = m < 10 ? '0' + m : m
			s = s < 10 ? '0' + s : s
			this.currentTime = { h, m, s }
			setTimeout(startTime, 1000)
		}
		startTime()
	}

}
