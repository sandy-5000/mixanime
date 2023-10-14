import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-countdown',
	templateUrl: './countdown.component.html',
	styleUrls: ['./countdown.component.css']
})
export class CountdownComponent {
	@Input() seconds: string | number | undefined

	constructor() { }

	ngOnInit(): void {
		console.log(this.seconds)
	}

}
