import { Component } from '@angular/core';
import { SharedviewService } from '../../services/sharedview/sharedview.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent {

	constructor(private sharedView: SharedviewService) { }

	ngOnInit(): void {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['search']
		})
	}

}
