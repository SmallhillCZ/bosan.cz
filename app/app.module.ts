import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http }     from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';

// Views components
import { FrontPageComponent }  from './views/front-page/front-page.component';
import { EventDetailComponent }  from './views/event-detail/event-detail.component';
import { PageViewComponent }  from './views/page-view/page-view.component';

// Services
import { DataService } 		from './services/data.service';
import { ToastService } 		from './services/toast.service';
import { UserService } 		from './services/user.service';

// Import Modules
//import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

// Shared coremponents

// Pipes
import { MoneyPipe } from './shared/pipes/money.pipe';

// Routes
import { routing } from './app.routing';

// Providers
import { AuthHttp, AuthConfig } from 'angular2-jwt';
export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({}), http);
}

@NgModule({
  imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		routing,
		//FileUploadModule
	],
  declarations: [
		AppComponent, 
		/* VIEWS */ FrontPageComponent, EventDetailComponent, PageViewComponent, 
		/* Shared Components */
		/* PIPES */ MoneyPipe
	],
	providers: [
		/* SERVICES */ DataService, ToastService, UserService,
		{
			provide: AuthHttp,
			useFactory: getAuthHttp,
			deps: [Http]
		}],
  bootstrap: [ AppComponent ]
})
export class AppModule { }