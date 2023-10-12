import { Component } from '@angular/core';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

	constructor() { }

	ngOnInit(): void {
		const navs = document.querySelectorAll('.nav')
		navs.forEach(x => {
			x.classList.remove('bg-sgreen')
			x.classList.remove('text-slate-800')
		})
		const navButtons = document.querySelectorAll('.profile-nav')
		navButtons.forEach(x => {
			x.classList.add('bg-sgreen')
			x.classList.add('text-slate-800')
		})
	}

}
