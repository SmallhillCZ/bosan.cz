import { Routes, RouterModule } from '@angular/router';

import { FrontPageComponent }  from './views/front-page/front-page.component';
import { EventDetailComponent }  from './views/event-detail/event-detail.component';
import { EventsOverviewComponent }  from './views/events-overview/events-overview.component';
import { PageViewComponent }  from './views/page-view/page-view.component';
import { MembersListComponent }  from './views/members-list/members-list.component';
import { MemberDetailComponent }  from './views/member-detail/member-detail.component';

const appRoutes: Routes = [
	
  {path: 'novinky',component: FrontPageComponent},
	
	{path: 'akce/program',component: EventsOverviewComponent},
	{path: 'akce/:id',component: EventDetailComponent},
	{path: 'akce', redirectTo: 'akce/program', pathMatch: 'full'},
	
	{path: 'stranka/:id',component: PageViewComponent},
	
	{path: 'clenove/:id',component: MemberDetailComponent},
	{path: 'clenove',component: MembersListComponent},
	
	
	{path: '', redirectTo: 'novinky', pathMatch: 'full'}
	
	//{path: 'profil/:id/admin/:view',component: EntityAdminComponent},
	//{path: 'profil/:id/admin', redirectTo: 'profil/:id/admin/informace'},
	
	//{path: 'profil/:id/:view',component: EntityProfileComponent},
	
];

export const routing = RouterModule.forRoot(appRoutes);