import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { ContentToolsService } from "ng2-content-tools";

@Component({
	moduleId: module.id,
	selector: 'event-info',
	templateUrl: 'event-info.template.html',
	styleUrls: ['event-info.style.css']
})
export class EventInfoComponent implements OnDestroy {
	
	@Input() event:any;

	@Output() save = new EventEmitter();

	editMode:boolean = false;

	constructor(private ctService:ContentToolsService) {
	}
	 
	editStart(){
		this.ctService.start('event-info *[content-tools]',e => this.save.emit());
		this.editMode = true;
	}

	editStop(){
		this.ctService.stop(true);
		this.editMode = false;
	}

	ngOnDestroy(){
		this.editStop();
	}

	setStartDate(date){
		this.event.startDate = new Date(date);
	}

	setEndDate(date){
		this.event.endDate = new Date(date);
	}
}