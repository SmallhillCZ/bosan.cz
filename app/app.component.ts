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
	
	constructor(public toastService: ToastService, public userService: UserService, private ctService: ContentToolsService) {
		this.toasts = this.toastService.toasts;		
	}

	ngOnInit(){
		this.ctService.init({
			fixture: (el) => el.hasAttribute('data-fixture'),
			ignition: false
		});
	}

}