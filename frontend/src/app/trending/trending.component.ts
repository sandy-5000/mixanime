import { Component } from '@angular/core';

@Component({
	selector: 'app-trending',
	templateUrl: './trending.component.html',
	styleUrls: ['./trending.component.css']
})
export class TrendingComponent {

	constructor() { }

	ngOnInit(): void {
		const navs = document.querySelectorAll('.nav')
		navs.forEach(x => {
			x.classList.remove('bg-sgreen')
			x.classList.remove('text-slate-800')
		})
		const navButtons = document.querySelectorAll('.trending-nav')
		navButtons.forEach(x => {
			x.classList.add('bg-sgreen')
			x.classList.add('text-slate-800')
		})
	}

}
