import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ToastService } from '../../services/toast.service';
import { DataService } from '../../services/data.service';

import { ContentToolsService } from "ng2-content-tools";

@Component({
	moduleId: module.id,
  selector: 'page-view',
	templateUrl: 'page-view.template.html',
	styleUrls: ['page-view.style.css'],
})
export class PageViewComponent implements OnInit {
	
	page;
	
	editMode: boolean = false;

	constructor(private toastService: ToastService, private dataService: DataService, private route: ActivatedRoute, private ctService:ContentToolsService) {
	}
	
	ngOnInit(){
		
		this.toastService.loading(true);
		
		this.route.params.forEach((params: Params) => {
			
			this.dataService.getPage(params["id"])
				.then(page => {
					this.toastService.loading(false);
					this.page = page;
				})
				.catch(err => {
					this.toastService.loading(false);
					this.page = null;
					this.toastService.toast("Chyba při načítání stránky","error");
				});
		});
	}
	
	editStart(){
		this.ctService.start('.page *[content-tools]',e => this.save());
		this.editMode = true;
	}

	editStop(){
		this.ctService.stop(true);
		this.editMode = false;
	}
	
	save(){
		
		var loadingToast = this.toastService.toast("Ukládám...","notice");
		
		this.dataService.savePage(this.page._id,this.page)
			.then(page => {
				this.page = page;
				loadingToast.hide();
				this.toastService.toast("Uloženo","notice");
			})
			.catch(err => {
				this.toastService.toast("Nastala chyba při ukládání stránky: " + err,"error");
			});
		
	}
}