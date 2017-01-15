import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { ToastService } from '../../../services/toast.service';
import { UserService } from '../../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'event-list',
	templateUrl: 'event-list.template.html',
	styleUrls: ['event-list.style.css']
})
export class EventListComponent implements OnInit {
	
	@Input()
	limit: number = 10;
	 
	@Input()
	sort: string = "desc";
	 
	@Input()
	from: Date;
	 
	page: number = 1;
	
	events;
	
	user: any;

	constructor(private dataService: DataService, private toastService: ToastService, private userService: UserService){
		this.user = this.userService.user;
	}
	 
	 ngOnInit(){
		 this.loadEvents(1);
	 }

	 loadEvents(page){

		 if(page < 1) page = 1;

		 if(this.events){
			 if(page > this.events.pages) page = this.events.pages;
			 if(page == this.page) return;
		 }

		 this.page = page;
		 
		 this.toastService.loading(true);
		 
		 var params: any = {limit:this.limit,sort:this.sort,page:this.page};
		 if(this.from) params.from = this.from;

		 this.dataService.getEvents(params)
			 .then(events => {
				 this.toastService.loading(false);
				 this.events = events;
			 })
			 .catch(err => {
				 this.toastService.loading(false);
				 this.toastService.toast("Nastala chyba při stahování programu akcí.","error");
				 this.events = null;
			 });
	 }
	 
	getEventLink(event){
		return ['/akce',event.url ? event.url : event._id];
	}
	
	getRSVP(event){
		if(!event.rsvp) event.rsvp = [];
		return event.rsvp.some(user => user._id == this.user._id);
	}

	setRSVP(event,attending){
		
		if(this.getRSVP(event) === attending) return;
		
		var oldRSVP = JSON.parse(JSON.stringify(event.rsvp));
		
		event.rsvp = event.rsvp.filter(item => item._id != this.user._id);
		if(attending) event.rsvp.push(this.user);
		
		this.dataService.setRSVP(event._id,this.user._id,attending)
			.then(rsvp => {
				event.rsvp = rsvp;
				this.toastService.toast("Uloženo.","warning");
			})
			.catch(err => {
				event.rsvp = oldRSVP;			
				this.toastService.toast("Nepodařilo se uložit účast na akci.","error");
			});
	}

}