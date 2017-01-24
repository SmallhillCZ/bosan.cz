import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';

import 'rxjs/add/operator/toPromise';

function toParams(options){
	return Object.keys(options).map(item => item + "=" + options[item]).join("&");
}

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
	getEvents(options?) {
			return this.http.get("/api/events" + (options ? "?" + toParams(options) : "")).toPromise().then(response => response.json());
	}
	
	getEvent(id) {
			return this.http.get("/api/events/" + id).toPromise().then(response => response.json());
	}
	
	setRSVP(eventId,userId,attending){
		if(attending === false) return this.http.delete("/api/events/" + eventId + "/rsvp/" + userId).toPromise().then(response => response.json());
		else return this.http.put("/api/events/" + eventId + "/rsvp/" + userId,{}).toPromise().then(response => response.json());
	}
	
	getNews(options?) {
			return this.http.get("/api/news" + (options ? "?" + toParams(options) : "")).toPromise().then(response => response.json());
	}
	
	getMembers(options?){
		return this.http.get("/api/members" + (options ? "?" + toParams(options) : "")).toPromise().then(response => response.json());
	}
	
	getMember(id){
		return this.http.get("/api/members/" + id).toPromise().then(response => response.json());
	}
	
	getPage(id){
		return this.http.get("/api/pages/" + id).toPromise().then(response => response.json());
	}
	
	createPage(data){
		return this.http.post("/api/pages", data).toPromise().then(response => response.json());
	}
	
	savePage(id,data){
		return this.http.put("/api/pages/" + id, data).toPromise().then(response => response.json());
	}
}