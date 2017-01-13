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
	
	events: {
		docs: [],
		pages: number
	} = {};
	
	user: any;

	constructor(private dataService: DataService, private toastService: ToastService, private userService: UserService){
		this.user = this.userService.user;
	}
	 
	 ngOnInit(){
		 this.loadEvents();
	 }

	 loadEvents(){

		 var loadingToast = this.toastService.toast("Načítám akce...","notice");
		 
		 var params: any = {limit:this.limit,sort:this.sort,page:this.page};
		 if(this.from) params.from = this.from;

		 this.dataService.getEvents(params)
			 .then(events => {
				 loadingToast.hide();
				 this.events = events;
			 })
			 .catch(err => {
				 loadingToast.hide();
				 this.toastService.toast("Nastala chyba při stahování programu akcí.","error");
				 this.events = {};
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
		
		this.dataService.setRSVP(event._id,{"id": this.user._id,"attending": attending})
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