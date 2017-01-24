import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ToastService } from '../../services/toast.service';
import { DataService } from '../../services/data.service';

@Component({
	moduleId: module.id,
  selector: 'page-view',
	templateUrl: 'page-view.template.html',
	styleUrls: ['page-view.style.css'],
})
export class PageViewComponent implements OnInit {
	
	page;
	
	editMode: boolean = false;

	constructor(private toastService: ToastService, private dataService: DataService, private route: ActivatedRoute) {
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
	
	pageSave(){
		
		// save old page in case of failure
		var oldPage = JSON.parse(JSON.stringify(this.page));
		
		this.editMode = false;
		
		this.dataService.savePage(this.page._id,this.page)
			.then(page => {
				this.page = page;
				this.toastService.toast("Uloženo","notice");
			})
			.catch(err => {
				this.page = oldPage;
				this.toastService.toast("Nastala chyba při ukládání stránky: " + err,"error");
			});
		
	}
}