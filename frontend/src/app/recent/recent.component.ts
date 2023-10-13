import { Component } from '@angular/core';
import { SharedviewService } from '../services/sharedview/sharedview.service';

@Component({
	selector: 'app-recent',
	templateUrl: './recent.component.html',
	styleUrls: ['./recent.component.css']
})
export class RecentComponent {

	constructor(private sharedView: SharedviewService) { }

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['recent']
		})
	}

}
