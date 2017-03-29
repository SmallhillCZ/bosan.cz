import { Component } from '@angular/core';

import { ToastService } 		from './services/toast.service';
import { UserService } 		from './services/user.service';
import { ContentToolsService } from 'ng2-content-tools';

@Component({
	moduleId: module.id,
	selector: 'bosan-web',
	templateUrl: 'app.template.html',
	styleUrls: ['app.style.css']
})
export class AppComponent {
	
	toasts: Array<any>;
	
	menuDropdown = {
		oddil: false,
		ostatni: false,
		interni: false
	};
	
	constructor(public toastService: ToastService, public userService: UserService, private ctService: ContentToolsService) {
		this.toasts = this.toastService.toasts;		
	}

	ngOnInit(){
		this.ctService.init("*[content-tools]","name",(el) => el.hasAttribute('data-fixture'),false);
	}

	dropdownToggle(id){
		this.menuDropdown[id] = !this.menuDropdown[id];
	}

}