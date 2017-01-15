import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { ToastService } from '../../../services/toast.service';
import { UserService } from '../../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'news-list',
	templateUrl: 'news-list.template.html',
	styleUrls: ['news-list.style.css']
})
export class NewsListComponent implements OnInit {
	
	@Input()
	limit: number = 10;
	 
	@Input()
	sort: string = "desc";
	 
	@Input()
	from: Date;
	 
	page: number = 1;
	
	news;
	
	user: any;

	constructor(private dataService: DataService, private toastService: ToastService, private userService: UserService){
		this.user = this.userService.user;
	}
	 
	 ngOnInit(){
		 this.loadNews(1);
	 }

	 loadNews(page){

		 if(page < 1) page = 1;

		 if(this.news){
			 if(page > this.news.pages) page = this.news.pages;
			 if(page == this.page) return;
		 }

		 this.page = page;

		 var loadingToast = this.toastService.toast("Načítám...","loading");

		 var params: any = {limit:this.limit,sort:this.sort,page:this.page};
		 if(this.from) params.from = this.from;

		 this.dataService.getNews(params)
			 .then(news => {
				 loadingToast.hide();
				 this.news = news;
			 })
			 .catch(err => {
				 loadingToast.hide();
				 this.toastService.toast("Nastala chyba při stahování novinek","error");
				 this.news = null;
			 });
	 }

}