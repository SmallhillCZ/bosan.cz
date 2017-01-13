import { Component } from '@angular/core';

import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'front-page',
	templateUrl: 'front-page.template.html',
	styleUrls: ['front-page.style.css']
})
export class FrontPageComponent {
	
	listFrom: Date = new Date();

	constructor(private dataService: DataService, private toastService: ToastService, private userService: UserService) {		
	}

}