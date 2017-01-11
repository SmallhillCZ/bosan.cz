import { Component } from '@angular/core';

import { DataService } from './services/data.service';
import { ToastService } 		from './services/toast.service';
import { UserService, User } 		from './services/user.service';
//import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	moduleId: module.id,
	selector: 'supervizor-plus',
	templateUrl: 'app.template.html',
	styleUrls: ['app.style.css']
})
export class AppComponent {

	//private viewContainerRef: ViewContainerRef; // ng2-bootstrap requirement

	//@ViewChild('loginModal')
	//public loginModal;

	toasts: Array<any>;

	year: string;

	constructor(private toastService: ToastService, public userService: UserService) {
		var today = new Date();
		this.year = today.getFullYear() == 2016 ? "2016" : "2016 ~ " + today.getFullYear();

		this.toasts = this.toastService.toasts;		
		
		//componentsHelper.setRootViewContainerRef(viewContainerRef); // ng2-bootstrap requirement
	}

}