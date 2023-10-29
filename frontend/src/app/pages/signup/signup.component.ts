import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';
import { SharedviewService } from 'src/app/services/sharedview/sharedview.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent {

	constructor(
		private router: Router,
		private server: BackendService,
		private sharedView: SharedviewService
	) { }

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['signup']
		})
	}

	loading: Boolean = false

	username: string = ''
	usermail: string = ''
	passwd: string = ''
	cpasswd: string = ''
	errors: any = {
		username: '',
		usermail: '',
		passwd: '',
		cpasswd: '',
		message: '',
	}

	validate(param: string) {
		let flag = true
		if (param === 'username' || param === 'all') {
			if (this.username === '') {
				this.errors.username = ''
			} else if (3 > this.username.length || this.username.length > 30) {
				this.errors.username = 'Name must be of size 3 to 30 characters'
				flag = false
			} else {
				this.errors.username = ''
			}
		}
		if (param === 'usermail' || param === 'all') {
			if (this.usermail === '') {
				this.errors.usermail = ''
			} else if (!/^[a-zA-Z0-9\.]{1,64}@[a-zA-Z0-9]{3,10}.com$/.test(this.usermail)) {
				this.errors.usermail = 'Unknown Email Format'
				flag = false
			} else {
				this.errors.usermail = ''
			}
		}
		if (param === 'passwd' || param === 'all') {
			if (this.passwd === '') {
				this.errors.passwd = ''
			} else if (this.passwd.length < 8) {
				this.errors.passwd = 'Contains atleast 8 chars'
				flag = false
			} else {
				this.errors.passwd = ''
			}
		}
		if (param === 'cpasswd' || param === 'all') {
			if (this.cpasswd === '') {
				this.errors.cpasswd = ''
			} else if (this.passwd !== this.cpasswd) {
				this.errors.cpasswd = 'Password didn\'t match'
				flag = false
			} else {
				this.errors.cpasswd = ''
			}
		}
		return flag
	}

	goToRoute(path: string): void {
		this.router.navigateByUrl(path)
	}

	submitForm(formData: any): void {
		if (!this.validate('all')) {
			return
		}
		this.loading = true
		this.server.post('/api/user/register', formData).subscribe((userData: any) => {
			this.loading = false
			if (userData.error) {
				this.errors.message = userData.error
				setTimeout(() => {
					this.errors.message = ''
				}, 5000)
				return
			}
			this.router.navigateByUrl('/login')
		})
	}

}
