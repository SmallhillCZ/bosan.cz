import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { DataService } from "../../../services/data.service";
import { ToastService } from "../../../services/toast.service";

@Component({
	moduleId: module.id,
	selector: 'event-expenses',
	templateUrl: 'event-expenses.template.html',
	styleUrls: ['event-expenses.style.css']
})
export class EventExpensesComponent {
	
	@Input() event:any;

	@Output() save = new EventEmitter();

  @ViewChild('focusField') focusField:ElementRef;

  newExpense:{id:number,description:string,amount:number} = {id:null,description:null,amount:null};

	constructor(private dataService:DataService, private toastService:ToastService) {
	}
   
  ngOnInit(){
    this.focusField.nativeElement.focus();
  }

	ngOnDestroy(){
	}
   
  getMaxId(){
    var id = 1;
    if(this.event.expenses) this.event.expenses.forEach(expense => id = Math.max(id,expense.id + 1));
    return id;
  }
   
  getTotalExpenses(){
    var sum = 0;
    if(this.event.expenses) this.event.expenses.forEach(expense => sum += expense.amount);
    sum += this.newExpense.amount;
    return sum;
  }
   
  addExpense(){
    
    if(!this.newExpense.id) this.newExpense.id = this.getMaxId();
    
    if(!this.event.expenses) this.event.expenses = [];
    
    this.event.expenses.push(this.newExpense);
    
    this.newExpense = {id: null,description:null,amount:null};
    
    this.focusField.nativeElement.focus();
    
    this.sortExpenses();
  }  
   
  removeExpense(expense){
    this.event.expenses = this.event.expenses.filter(item => item !== expense);
  }
   
  sortExpenses(){
    if(this.event.expenses) this.event.expenses.sort((a,b) => a.id < b.id ? -1 : (a.id > b.id ? 1 : 0));
  }
  
}