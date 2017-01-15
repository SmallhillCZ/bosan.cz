import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

@Component({
	moduleId: module.id,
	selector: 'members-list',
	templateUrl: 'members-list.template.html',
	styleUrls: ['members-list.style.css']
})
export class MembersListComponent implements OnInit{
	
	members;
	
	filter = {
		squad: null,
		nickname: null,
		role: null,
		rank: null,
		firstname: null,
		lastname: null
	};

	constructor(private dataService: DataService, private toastService: ToastService, private router: Router) {
	}
	
	ngOnInit(){
		this.loadMembers();
	}

	loadMembers(){
		
		this.toastService.loading(true);
		
		this.dataService.getMembers()
			.then(members => {
				this.toastService.loading(false);
				this.members = members;
			console.log(this.getList());
			})
			.catch(err => {
				this.toastService.loading(false);
				this.toastService.toast("Nastala chyba při stahování seznamu členů","error");
				this.members = [];
			});
	}
	
	getList(){
		
		return this.members.docs.filter(member => {
			
			var matched = {
				squad: member.squad,
				nickname: member.nickname,
				role: member.role,
				rank: member.rank,
				firstname: member.name ? member.name.first : null,
				lastname: member.name ? member.name.last : null
			}

			return Object.keys(matched).every(key => {
				if(!this.filter[key]) return true;
				if(!matched[key]) return false;
				return (-1 !== matched[key].toLowerCase().search(this.filter[key].toLowerCase()));
			});
		});
	}
	
	openMember(member){
		this.router.navigate(['/clenove',member._id]);
	}

}