import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, HttpModule }     from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ToastService } from '../../services/toast.service';

@Component({
	moduleId: module.id,
  selector: 'page-view',
	templateUrl: 'page-view.template.html',
	styleUrls: ['page-view.style.css'],
})
export class PageViewComponent implements OnInit {
	
	pageId;
	pageContent;

	constructor(private toastService: ToastService, private route: ActivatedRoute, private http: Http) {
	}

	getPageContent(id){
		return this.http.get("/app/pages/" + this.pageId + ".html").toPromise();
	}
	
	ngOnInit(){
		
		this.toastService.loading(true);
		
		this.route.params.forEach((params: Params) => {
			this.pageId = params["id"];
			this.getPageContent(this.pageId)
				.then(res => {
					this.toastService.loading(false);
					this.pageContent = res.text();
				})
				.catch(err => {
					this.toastService.loading(false);
					this.toastService.toast("Chyba při načítání stránky","error");
				});
		});
	}


}