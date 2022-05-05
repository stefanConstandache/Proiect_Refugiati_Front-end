import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { RefugeeDashboardComponent } from './components/dashboards/refugee-dashboard/refugee-dashboard.component';
import { VolunteerDashboardComponent } from './components/dashboards/volunteer-dashboard/volunteer-dashboard.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    // The user need to have this roles to access
    data: { roles: ['admin'] },
  },
  {
    path: 'volunteer',
    component: VolunteerDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['volunteer'] },
  },
  {
    path: 'refugee',
    component: RefugeeDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['refugee'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
