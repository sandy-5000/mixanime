import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';
import { SharedviewService } from 'src/app/services/sharedview/sharedview.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	constructor(
		private router: Router,
		private server: BackendService,
		private sharedView: SharedviewService
	) { }

	usermail: string = ''
	passwd: string = ''
	error: string = ''

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['login']
		})
		localStorage.removeItem('token')
		localStorage.removeItem('user-data')
		this.sharedView.changeState({
			method: 'checkLogin',
			params: []
		})
	}

	validate(): boolean {
		if (this.usermail == '') {
			return false
		}
		if (this.passwd == '') {
			return false
		}
		return true
	}

	submitForm(formData: any): void {
		this.error = ''
		if (!this.validate()) {
			alert('fill all the fields')
			return
		}
		this.server.post('/api/user/login', formData).subscribe((userData) => {
			if (userData.error) {
				this.error = userData.error
				setTimeout(() => {
					this.error = ''
				}, 3000)
				return
			}
			localStorage.setItem('token', userData.jwt)
			localStorage.setItem('user-data', JSON.stringify(userData))
			this.sharedView.changeState({
				method: 'checkLogin',
				params: []
			})
			const previousPage = localStorage.getItem('prev-page')
			if (previousPage) {
				this.goToRoute(previousPage)
			} else {
				this.goToRoute('/home')
			}
		})
	}

	goToRoute(path: string): void {
		this.router.navigateByUrl(path)
	}

}
