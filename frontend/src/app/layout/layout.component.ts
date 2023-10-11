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

	ngOnInit(): void { }

	goToRoute(path: string): void {
		this.router.navigateByUrl(path)
	}

}
