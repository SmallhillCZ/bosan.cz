import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ContentToolsService } from "ng2-content-tools";
import { DataService } from "../../../services/data.service";
import { ToastService } from "../../../services/toast.service";

@Component({
	moduleId: module.id,
	selector: 'event-accounting',
	templateUrl: 'event-accounting.template.html',
	styleUrls: ['event-accounting.style.css']
})
export class EventAccountingComponent {
	
	@Input() event:any;

	@Output() save = new EventEmitter();

	editMode:boolean = false;

	members:any[];
	 
	ageDate:Date = new Date();

	constructor(private dataService:DataService, private toastService:ToastService, private ctService:ContentToolsService) {
	}

	ngOnDestroy(){
	}

	startEdit(){
		this.editMode = true;
	}
	 
	stopEdit(){
		this.editMode = false;
	}
}