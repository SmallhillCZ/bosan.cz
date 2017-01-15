import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

@Component({
	moduleId: module.id,
	selector: 'member-detail',
	templateUrl: 'member-detail.template.html',
	styleUrls: ['member-detail.style.css']
})
export class MemberDetailComponent implements OnInit {
	
	member;
	
	editmode: boolean = false;

	constructor(private dataService: DataService, private toastService: ToastService, private route: ActivatedRoute) {
	}
	
	ngOnInit(){
		this.route.params.subscribe((params: Params) => this.loadMember(params['id']));
	}

	loadMember(id){
		
		this.toastService.loading(true);
		
		this.dataService.getMember(id)
			.then(member => {
				this.toastService.loading(false);
				this.member = member;
			})
			.catch(err => {
				this.toastService.loading(false);
				this.toastService.toast("Nastala chyba při stahování dat o členovi","error");
				this.member = null;
			});
	}

}