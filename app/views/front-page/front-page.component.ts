import { Component } from '@angular/core';

import { DataService } from './services/data.service';

@Component({
	moduleId: module.id,
	selector: 'front-page',
	templateUrl: 'front-page.template.html',
	styleUrls: ['front-page.style.css']
})
export class FrontPageComponent {

	constructor(private toastService: DataService) {
	}

}