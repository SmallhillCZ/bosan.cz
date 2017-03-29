import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ToastService } from '../../services/toast.service';
import { DataService } from '../../services/data.service';

import { ContentToolsService } from "ng2-content-tools";


class Page {
	_id: string;
	title: string;
	url: string;
	body: string;
	files: string[];
	created: Date;
	changed: Date;
}

@Component({
	moduleId: module.id,
  selector: 'page-view',
	templateUrl: 'page-view.template.html',
	styleUrls: ['page-view.style.css'],
})
export class PageViewComponent implements OnInit {
	
	page:Page = new Page();

	url:string;
	
	editMode: boolean = false;
	
	notFound: boolean = false;

	constructor(private toastService: ToastService, private dataService: DataService, private route: ActivatedRoute, private ctService:ContentToolsService) {
	}
	
	ngOnInit(){
		
		this.toastService.loading(true);
		
		this.route.params.forEach((params: Params) => {
			
			this.url = params["id"];
			
			this.loadPage(this.url);

		});
	}
	
	loadPage(url){
		
		if(this.editMode) this.editStop(false);
		
		this.dataService.getPage(url)
			.then(page => {
				this.toastService.loading(false);
				this.page = page;
				this.notFound = false;
			})
			.catch(err => {
				this.toastService.loading(false);
				this.page = new Page();
				this.notFound = true;
			});
	}
	
	createPage(){
		this.page = new Page();
		this.page.url = this.url;
		this.page.title = "Nová stránka";
		this.page.body = "<h1>Nadpis</h1><h2>Podnadpis</h2><p>Zde je obsah vaší nové stránky</p>";
		this.editStart();
		this.notFound = false;
	}
	
	editStart(){
		this.ctService.start('.page *[content-tools]',e => this.save());
		this.editMode = true;
	}

	editStop(save){
		this.ctService.stop(save);
		this.editMode = false;
		if(!save) this.loadPage(this.url);
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