import { Component } from '@angular/core';
import { SharedviewService } from 'src/app/services/sharedview/sharedview.service';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {

	constructor(private sharedView: SharedviewService) { }

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['schedule']
		})
		this.sharedView.changeState({
			method: 'checkLogin',
			params: []
		})
	}

}
