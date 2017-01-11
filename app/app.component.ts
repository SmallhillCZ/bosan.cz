import { Component } from '@angular/core';

import { ToastService } 		from './services/toast.service';

@Component({
	moduleId: module.id,
	selector: 'bosan-web',
	templateUrl: 'app.template.html',
	styleUrls: ['app.style.css']
})
export class AppComponent {
	toasts: Array<any>;

	constructor(public toastService: ToastService) {
		this.toasts = this.toastService.toasts;		
	}

}