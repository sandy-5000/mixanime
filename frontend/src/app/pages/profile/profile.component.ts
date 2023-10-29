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
		this.loading = true
		this.server.post('/api/user/profile', {}).subscribe((userData: any) => {
			this.loading = false
			if (userData.error) {
				this.router.navigateByUrl('/login')
			}
			this.username = userData.name
			this.usermail = userData.email
			console.log(userData)
		})
	}

	username: string = ''
	usermail: string = ''
	passwd: string = ''
	npasswd: string = ''
	errors: any = {
		username: '',
		npasswd: '',
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
		return flag
	}

	submitForm(formData: any): void {
		if (!this.validate('all')) {
			return
		}
		console.log(formData)
	}

}
