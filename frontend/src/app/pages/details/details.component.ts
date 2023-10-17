import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent {

	id: string | null = ''

	constructor(private route: ActivatedRoute) {
		this.id = this.route.snapshot.paramMap.get('id')
	}

}
