import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  //{path: '',component: FrontPageComponent},
	
	//{path: 'stranka/:id',component: PageViewComponent},
	
	//{path: 'profil/:id/admin/:view',component: EntityAdminComponent},
	//{path: 'profil/:id/admin', redirectTo: 'profil/:id/admin/informace'},
	
	//{path: 'profil/:id/:view',component: EntityProfileComponent},
	//{path: 'profil/:id', redirectTo: 'profil/:id/prehled'}
];

export const routing = RouterModule.forRoot(appRoutes);