import { Component } from '@angular/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent {

	constructor() { }

	ngOnInit(): void {
		const navs = document.querySelectorAll('.nav')
		navs.forEach(x => {
			x.classList.remove('bg-slate-800')
		})
		const navButtons = document.querySelectorAll('.search-nav')
		navButtons.forEach(x => {
			x.classList.add('bg-slate-800')
		})
	}

}
