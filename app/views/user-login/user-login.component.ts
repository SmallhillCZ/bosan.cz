import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from '../../services/toast.service';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';

@Component({
	moduleId: module.id,
  selector: 'user-login',
	templateUrl: 'user-login.template.html',
	styleUrls: ['user-login.style.css'],
})
export class UserLoginComponent{
	
	loginData = {
		email: "",
		password: ""
	};

	constructor(private toastService: ToastService, private dataService: DataService, private userService: UserService, private router: Router) {
	}
	
	login(){
		this.userService.login(this.loginData)
			.then(user => {
				this.toastService.toast("Jsi přihlášen/a.","notice");
				this.router.navigate(['/']);
			})
			.catch(err => {
				switch(err.status){
					case 404:
						this.toastService.toast("Uživatel s tímto emailem neexistuje.","error");
						return;
					case 401:
						this.toastService.toast("Chyné heslo.","error");
						return;
					default:
						this.toastService.toast("Nastala chyba při přihlašování.","error");
				}
			});
	}

	emailLogin(){
		this.userService.emailLogin(this.loginData.email)
			.then(() => {
				this.toastService.toast("Email s heslem byl odeslán.","notice");
			})
			.catch(err => this.toastService.toast("Nastala chyba při přihlašování.","error"));
	}
}