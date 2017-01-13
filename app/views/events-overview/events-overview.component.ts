import { Component, Input } from '@angular/core';

import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'events-overview',
	templateUrl: 'events-overview.template.html',
	styleUrls: ['events-overview.style.css']
})
export class EventsOverviewComponent {
	
	from = new Date();

	constructor(private dataService: DataService, private toastService: ToastService, private userService: UserService) {
		console.log(this.from);
	}

}