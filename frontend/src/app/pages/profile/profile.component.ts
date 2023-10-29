import { Component } from '@angular/core'
import { SharedviewService } from '../../services/sharedview/sharedview.service'
import { BackendService } from 'src/app/services/backend/backend.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

	constructor(
		private server: BackendService,
		private sharedView: SharedviewService,
		private router: Router
	) { }

	loading: Boolean = false

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['profile']
		})
		this.sharedView.changeState({
			method: 'checkLogin',
			params: []
		})
		this.loading = true
		const userData: any = JSON.parse(localStorage.getItem('user-data') || '{}')
		if (!userData || !userData.email) {
			this.router.navigateByUrl('/login')
		}
		this.server.post('/api/user/profile', {}).subscribe((userData: any) => {
			this.loading = false
			if (userData.error) {
				this.router.navigateByUrl('/login')
			}
			this.name = userData.name
			this.username = userData.name
			this.usermail = userData.email
			localStorage.setItem('user-data', JSON.stringify(userData))
		})
	}

	name: string = ''

	username: string = ''
	usermail: string = ''
	passwd: string = ''
	npasswd: string = ''
	errors: any = {
		username: '',
		npasswd: '',
		message: '',
	}
	success: string = ''

	validate(param: string) {
		let flag = true
		if (param === 'username' || param === 'all') {
			if (3 > this.username.length || this.username.length > 30) {
				this.errors.username = 'Name must be of size 3 to 30 characters'
				flag = false
			} else {
				this.errors.username = ''
			}
		}
		if (param === 'npasswd' || param === 'all') {
			if (this.npasswd === '') {
				this.errors.npasswd = ''
			} else if (this.npasswd.length < 8) {
				this.errors.npasswd = 'Contains atleast 8 chars'
				flag = false
			} else {
				this.errors.npasswd = ''
			}
		}
		if (param === 'all') {
			if (this.passwd === '') {
				flag = false
			}
		}
		return flag
	}

	submitForm(formData: any): void {
		if (!this.validate('all')) {
			return
		}
		this.server.post('/api/user/update-profile', formData).subscribe((userData: any) => {
			if (userData.error) {
				this.errors.message = userData.error
				this.npasswd = ''
				this.errors.npasswd = ''
				this.passwd = ''
				setTimeout(() => {
					this.errors.message = ''
				}, 5000)
				return
			}
			this.name = userData.name
			this.username = userData.name
			this.npasswd = ''
			this.errors.npasswd = ''
			this.passwd = ''
			this.success = 'Profile updated Successfully'
			setTimeout(() => {
				this.success = ''
			}, 5000)
			localStorage.setItem('token', userData.jwt)
			localStorage.setItem('user-data', JSON.stringify(userData))
		})
	}

	reset() {
		this.username = this.name
		this.errors.username = ''
	}

}
