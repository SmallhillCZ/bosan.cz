import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';

import 'rxjs/add/operator/toPromise';

/**
	* Service to communicate with server database
	* getEntities - returns Promise with the list of entities, possibly filtered by filter:object parameter
	* getEntity - returns Promise with single entity
	* saveEntity - updates entity and returns Promise with updated data on entity
	* getDashboard - returns Promise with dashboard data
	* getExpenditures - returns Promise with expenditures data for entity and year
	* getExpendituresUploader - returns ng2-file-uploader FileUploader class ready to be attached to input or dropzone
	**/
@Injectable()
export class DataService {
	
	constructor(private http: Http, private authHttp: AuthHttp) {}

	/* EVENTS */
	getEvents() {
			return this.http.get("/api/events").toPromise().then(response => response.json());
	}
	
	getEvent(id) {
			return this.http.get("/api/events/" + id).toPromise().then(response => response.json());
	}
	
	setRSVP(id,rsvp){
		return this.http.post("/api/events/" + id + "/rsvp",rsvp).toPromise().then(response => response.json());
	}
}