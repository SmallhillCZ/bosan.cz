import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'event-info',
	templateUrl: 'event-info.template.html',
	styleUrls: ['event-info.style.css']
})
export class EventInfoComponent {
	
	@Input() event:any;

	constructor() {
	}

	setStartDate(date){
		this.event.startDate = new Date(date);
	}

	setEndDate(date){
		this.event.endDate = new Date(date);
	}
}