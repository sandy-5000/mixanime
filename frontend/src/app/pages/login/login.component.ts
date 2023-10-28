import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedviewService } from 'src/app/services/sharedview/sharedview.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	constructor(
		private router: Router,
		private sharedView: SharedviewService
	) { }

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['login']
		})
	}

	goToRoute(path: string): void {
		this.router.navigateByUrl(path)
	}

}
