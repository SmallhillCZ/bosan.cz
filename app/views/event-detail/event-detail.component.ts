import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { ContentToolsService } from "ng2-content-tools";

@Component({
	moduleId: module.id,
	selector: 'event-detail',
	templateUrl: 'event-detail.template.html',
	styleUrls: ['event-detail.style.css']
})
export class EventDetailComponent {
	
	event;
	oldEvent;
	
	editMode = false;
	
	view = "info";

	constructor(private dataService: DataService, private toastService: ToastService, private router:Router, private route: ActivatedRoute, private ctService:ContentToolsService) {		
		this.route.params.subscribe((params: Params) => {
			if(!this.event || (this.event._id !== params['id'] && this.event.url !== params['id'])) this.load(params['id']);
			this.view = params["view"] ? params["view"] : "info";
		});
	}

	openView(view){
		if(view === this.view) return;
		if(this.editMode) this.editStop();
		this.router.navigate(["../" + view], { relativeTo: this.route });
	}

	editStart(){
		this.ctService.start('.event *[content-tools]',e => this.save());
		this.editMode = true;
	}

	editStop(){
		this.ctService.stop(true);
		this.editMode = false;
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
			})
			.catch(err => {
				savingToast.hide();
				this.toastService.toast("Chyba při ukládání.","error");
			});
	}

}