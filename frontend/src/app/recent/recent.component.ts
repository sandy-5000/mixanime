import { Component } from '@angular/core';

@Component({
	selector: 'app-recent',
	templateUrl: './recent.component.html',
	styleUrls: ['./recent.component.css']
})
export class RecentComponent {

	constructor() { }

	ngOnInit(): void {
		const navs = document.querySelectorAll('.nav')
		navs.forEach(x => {
			x.classList.remove('bg-slate-800')
		})
		const navButtons = document.querySelectorAll('.recent-nav')
		navButtons.forEach(x => {
			x.classList.add('bg-slate-800')
		})
	}

}
