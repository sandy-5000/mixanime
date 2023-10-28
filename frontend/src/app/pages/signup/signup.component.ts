import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedviewService } from 'src/app/services/sharedview/sharedview.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent {

	constructor(
		private router: Router,
		private sharedView: SharedviewService
	) { }

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['signup']
		})
	}

	goToRoute(path: string): void {
		this.router.navigateByUrl(path)
	}

}
