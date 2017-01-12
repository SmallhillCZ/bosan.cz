import { Routes, RouterModule } from '@angular/router';

import { FrontPageComponent }  from './views/front-page/front-page.component';
import { EventDetailComponent }  from './views/event-detail/event-detail.component';
import { PageViewComponent }  from './views/page-view/page-view.component';

const appRoutes: Routes = [
  {path: '',component: FrontPageComponent},
	
	{path: 'akce/:id',component: EventDetailComponent},
	
	{path: 'stranka/:id',component: PageViewComponent}
	
	//{path: 'profil/:id/admin/:view',component: EntityAdminComponent},
	//{path: 'profil/:id/admin', redirectTo: 'profil/:id/admin/informace'},
	
	//{path: 'profil/:id/:view',component: EntityProfileComponent},
	//{path: 'profil/:id', redirectTo: 'profil/:id/prehled'}
];

export const routing = RouterModule.forRoot(appRoutes);