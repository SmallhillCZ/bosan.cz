import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ContentToolsService } from "ng2-content-tools";
import { DataService } from "../../../services/data.service";
import { ToastService } from "../../../services/toast.service";

@Component({
	moduleId: module.id,
	selector: 'event-attending',
	templateUrl: 'event-attending.template.html',
	styleUrls: ['event-attending.style.css']
})
export class EventAttendingComponent {
	
	@Input() event:any;

	@Output() save = new EventEmitter();

	editMode:boolean = false;

	members:any[];
	 
	ageDate:Date = new Date();

	constructor(private dataService:DataService, private toastService:ToastService, private ctService:ContentToolsService) {
	}
	 
	loadMembers(){
		this.dataService.getMembers({})
			.then(members => this.members = members)
			.catch(e => this.toastService.toast("Nastala chyba při stahování členské databáze.","error"));
	}
	 
	addMember(member){
		var role = "d";
		var age = this.getMemberAge(member);
		if(age >= 15) role = "i";
		if(age >= 18) role = "v";
		if(!this.event.attending.some(attending => attending.member._id === member._id)) this.event.attending.push({"member": member,"role":role});
	}
	 
	removeMember(member){
		var i;
		this.event.attending.some((attending,key) => {
			if(attending.member === member){
				i = key;
				return true;
			}
		});
	  this.event.attending.splice(i,1);
	}
	 
	getAgeCount(ageFrom,ageTo){
		var i = 0;
		var age;
		this.event.attending.forEach(attending => {
			age = this.getMemberAge(attending.member);
			if(age >= ageFrom && age <= ageTo) i++;
		});
		return i;																 
	}
	 
	getRoleCount(role){
	  var i=0;
	  this.event.attending.forEach(attending => {
 		 if(attending.role === role) i++;
	  });
		return i;
	}

	ngOnDestroy(){
	}

	startEdit(){		 
		console.log(this.members);
		if(!this.members) this.loadMembers();
		this.editMode = true;
	}
	 
	stopEdit(){
		this.editMode = false;
		this.saveEvent();
	}
	 
	 saveEvent(){
		 var event = {_id:this.event._id,attending:[]};	
		 this.event.attending.forEach(attending => event.attending.push({"member": attending.member._id, "role": attending.role}));
		 this.save.emit(event);
	 }
	 
	 getMemberAge(member){ 
		 if(!member.birthday) return 0;

		 var eventDate = new Date(this.event.startDate);
		 var birthDate = new Date(member.birthday);

		 var age = eventDate.getFullYear() - birthDate.getFullYear();
		 var m = eventDate.getMonth() - birthDate.getMonth();
		 if (m < 0 || (m === 0 && eventDate.getDate() < birthDate.getDate())) {
			 age--;
		 }
		 return age;
	 }
}