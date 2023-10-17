import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedviewService } from 'src/app/services/sharedview/sharedview.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent {

	id: string | null = ''

	constructor(
		private route: ActivatedRoute,
		private sharedView: SharedviewService
	) {
		this.id = this.route.snapshot.paramMap.get('id')
	}

	ngOnInit() {
		this.sharedView.changeState({
			method: 'setNavButton',
			params: ['details']
		})
	}

}
