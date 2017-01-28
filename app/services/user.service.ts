import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

/**
	* Service to save user information and commnicate user data with server
	*/
@Injectable()
export class UserService {
	
	jwtHelper: JwtHelper = new JwtHelper();

	logged: boolean = false;
	
	/**
		* current user
		*/
	user: any;

	token: String = null;

	constructor(private http: Http){
		this.refreshState();
	}

	saveToken(token){
		window.localStorage.setItem("id_token", token);
		this.refreshState();
	}

	getToken(){
		return window.localStorage.getItem("id_token");	
	}

	deleteToken(){
		window.localStorage.removeItem("id_token");
		this.refreshState();
	}

	refreshState(){
		var token = this.getToken();
		
		if(token && !this.jwtHelper.isTokenExpired(token)){
			this.user = this.jwtHelper.decodeToken(token);
			this.logged = true;
		}	else {
			this.user = null;
			this.logged = false;
		}
	}

	login(data){
		return this.http.post("/api/login", data).toPromise()
			.then(response => response.text())
			.then(token => {
				if(!this.jwtHelper.isTokenExpired(token)){
					this.saveToken(token);
					return this.user;
				}
				return null;				
			});
	}

	emailLogin(email){
		return this.http.post("/api/login/email", {"email":email}).toPromise();
	}

	logout(){
		this.deleteToken();
	}

	isManagedProfile(profileId){
		return (this.user && this.user.managedProfiles.indexOf(profileId) >= 0);
	}
}