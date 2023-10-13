import { Component } from '@angular/core';
import { SharedviewService } from '../../services/sharedview/sharedview.service';

@Component({
	selector: 'app-trending',
	templateUrl: './trending.component.html',
	styleUrls: ['./trending.component.css']
})
export class TrendingComponent {

	constructor(private sharedView: SharedviewService) { }

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['trending']
		})
	}

}
