import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http }     from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';

// Views components - public
import { FrontPageComponent }  from './views/front-page/front-page.component';
import { EventDetailComponent }  from './views/event-detail/event-detail.component';
import { EventInfoComponent }  from './views/event-detail/event-info/event-info.component';
import { EventsOverviewComponent }  from './views/events-overview/events-overview.component';
import { PageViewComponent }  from './views/page-view/page-view.component';
import { UserLoginComponent }  from './views/user-login/user-login.component';

// Views components - internal
import { MembersListComponent }  from './views/members-list/members-list.component';
import { MemberDetailComponent }  from './views/member-detail/member-detail.component';

// Services
import { DataService } 		from './services/data.service';
import { ToastService } 		from './services/toast.service';
import { UserService } 		from './services/user.service';

// Import Modules
import { FileUploadModule } from 'ng2-file-upload';

// Shared coremponents
import { EventListComponent }  from './shared/components/event-list/event-list.component';
import { NewsListComponent }  from './shared/components/news-list/news-list.component';

// Directives
import { ContentToolsModule } from 'ng2-content-tools';

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
		/* Angular */ BrowserModule, HttpModule, FormsModule,
		/* routing */ routing,
		/* vendor */ ContentToolsModule, FileUploadModule
		
	],
  declarations: [
		AppComponent, 
		/* VIEWS - public */ FrontPageComponent, EventDetailComponent, EventInfoComponent, EventsOverviewComponent, PageViewComponent, UserLoginComponent,
		/* VIEWS - internal */ MembersListComponent, MemberDetailComponent, 
		/* Shared Components */ EventListComponent, NewsListComponent, 
		/* PIPES */ MoneyPipe
		/* Directives */
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