import { Component } from '@angular/core';
import { SharedviewService } from '../services/sharedview/sharedview.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

	constructor(private sharedView: SharedviewService) { }

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['profile']
		})
	}

}
