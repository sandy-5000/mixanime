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
			x.classList.remove('bg-sgreen')
			x.classList.remove('text-slate-800')
		})
		const navButtons = document.querySelectorAll('.search-nav')
		navButtons.forEach(x => {
			x.classList.add('bg-sgreen')
			x.classList.add('text-slate-800')
		})
	}

}
