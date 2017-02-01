import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'event-info',
	templateUrl: 'event-info.template.html',
	styleUrls: ['event-info.style.css']
})
export class EventInfoComponent {
	
	@Input() event:any;
	 
	@Output() save = new EventEmitter();
	
	edit = {
		description: false,
		takeWith: false
	};

	constructor() {
	}

	setStartDate(date){
		this.event.startDate = new Date(date);
	}

	setEndDate(date){
		this.event.endDate = new Date(date);
	}
	 
	saveEvent(){
		this.edit = {
			description: false,
			takeWith: false
		};
		this.save.emit();
	}

}