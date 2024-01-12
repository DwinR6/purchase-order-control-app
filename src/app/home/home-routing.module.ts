import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from '../layouts/full-layout/full-layout.component';
import { ContentLayoutComponent } from '../layouts/content-layout/content-layout.component';
import { FULL_ROUTES } from '../shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from '../shared/routes/content-layout.routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  //{ path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: FULL_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: FULL_ROUTES, },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES, },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
