import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SharedviewService } from '../services/sharedview/sharedview.service'

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

	constructor(
		private router: Router,
		private sharedView: SharedviewService
	) { }

	setNavButton(path: String) {
		const navs = document.querySelectorAll('.nav')
		navs.forEach(x => {
			x.classList.remove('bg-sgreen')
			x.classList.remove('text-slate-800')
		})
		const navButtons = document.querySelectorAll(`.${path}-nav`)
		navButtons.forEach(x => {
			x.classList.add('bg-sgreen')
			x.classList.add('text-slate-800')
		})
	}

	ngOnInit(): void {
		const methods: { [key: string]: (...args: any[]) => void } = {
			setNavButton: this.setNavButton
		}
		try {
			this.sharedView.current.subscribe((data: any) => {
				methods[data.method](...data.params)
			})
		} catch (e) {
			console.error(e)
		}
	}

	goToRoute(path: string): void {
		this.router.navigateByUrl(path)
	}

}
