import { Component } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'event-detail',
	templateUrl: 'event-detail.template.html',
	styleUrls: ['event-detail.style.css']
})
export class EventDetailComponent {
	
	event;
	
	user: any;

	constructor(private dataService: DataService, private toastService: ToastService, private userService: UserService, private route: ActivatedRoute) {
		
		this.user = this.userService.user;
		
		this.route.params.subscribe((params: Params) => this.loadEvent(params['id']));
	}

	loadEvent(id){
		
		this.toastService.loading(true);
		
		this.dataService.getEvent(id)
			.then(event => {
				this.toastService.loading(false);
				this.event = event;
			})
			.catch(err => {
				this.toastService.loading(false);
				this.toastService.toast("Nastala chyba při stahování akce.","error");
				this.event = null;
			});
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