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
	oldEvent
	
	edit:string = null;
	
	view = "detail";

	constructor(private dataService: DataService, private toastService: ToastService, private route: ActivatedRoute) {		
		this.route.params.subscribe((params: Params) => this.load(params['id']));
	}

	load(id){
		
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

	save(){
		
		var savingToast = this.toastService.toast("Ukládám...","notice");
		
		this.dataService.saveEvent(this.event._id,this.event)
			.then(() => {
				savingToast.hide();
				this.toastService.toast("Uloženo.","notice");
				this.edit = null;
			})
			.catch(err => {
				savingToast.hide();
				this.toastService.toast("Chyba při ukládání.","error");
			});
	}

	cancel(){
		this.edit = null;
	}

}