import {Injectable} from '@angular/core';


class ToastItem{
	
	/**
		* current opacity of this toast
		*/
	public opacity: number = 1;

	constructor(public text: string, public status: string, public stick: boolean){
		if(!this.stick) setTimeout(() => this.hide(), 2000);
	}

	// TODO: move dimming to AppComponent animations section, instead just save toast state
	dim(){
		this.opacity = 0.3;
	}

	hide(){
		this.opacity = 0;
	}

	show(){
		this.opacity = 1;
	}

}

/**
  * Service to manage warning toasts
	* 
	* toast() - create new toast
	*/
@Injectable()
export class ToastService {
	
	/**
		* array of toasts
		*/
	toasts: Array<ToastItem> = [];

	loadingToast: ToastItem;
	loadingCount: number = 0;

	constructor(){
		this.loadingToast = new ToastItem("Načítám...","loading",true);
		this.toasts.push(this.loadingToast);
		this.loadingToast.hide();
	}

	/**
		* text:string - text of toast
		* status:string - status type of toast, translates possibly to class
		* stick:boolean - false means toats should disappear after some time
		*/
	toast(text: string, status: string, stick?: boolean){
		var toast = new ToastItem(text, status ? status : "notice", stick);
		this.toasts.push(toast);
		return toast;
	}

	loading(isLoading: boolean){
		if(isLoading) this.loadingCount++;
		else this.loadingCount = Math.max(0,this.loadingCount - 1);
		
		if(this.loadingCount > 0) this.loadingToast.show();
		else this.loadingToast.hide();
	}

}