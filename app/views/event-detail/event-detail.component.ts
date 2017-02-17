import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

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
	oldEvent;
	
	view = "info";

	constructor(private dataService: DataService, private toastService: ToastService, private router:Router, private route: ActivatedRoute) {		
		this.route.params.subscribe((params: Params) => {
			if(!this.event || (this.event._id !== params['id'] && this.event.url !== params['id'])) this.load(params['id']);
			this.view = params["view"] ? params["view"] : "info";
		});
	}

	openView(view){
		if(view === this.view) return;
		this.router.navigate(["../" + view], { relativeTo: this.route });
	}

	load(id){
		
		this.toastService.loading(true);
		
		this.dataService.getEvent(id)
			.then(event => {
				this.toastService.loading(false);
				this.event = event;
				if(!this.event.report) this.event.report = "<p>Kroniku k této akci zatím nikdo nenapsal, můžeš to být právě ty!</p>";
			})
			.catch(err => {
				this.toastService.loading(false);
				this.toastService.toast("Nastala chyba při stahování akce.","error");
				this.event = null;
			});
	}

	save(event?){
			 
		if(!event) event = this.event;

		var savingToast = this.toastService.toast("Ukládám...","notice");
		
		this.dataService.saveEvent(event._id,event)
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