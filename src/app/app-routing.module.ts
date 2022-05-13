import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { RefugeeDashboardComponent } from './components/dashboards/refugee-dashboard/refugee-dashboard.component';
import { VolunteerDashboardComponent } from './components/dashboards/volunteer-dashboard/volunteer-dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { RegisterVolunteerComponent } from './components/register-volunteer/register-volunteer.component';
import { RegisterRefugeeComponent } from './components/register-refugee/register-refugee.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatusComponent } from './components/status/status.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['none'] },
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    // The user need to have this roles to access
    data: { roles: ['admin'] },
    children: [
      { path: 'news', component: NewsComponent },
      { path: 'register-volunteer', component: RegisterVolunteerComponent },
      { path: '', redirectTo: 'news', pathMatch: 'full' },
    ]
  },
  {
    path: 'volunteer',
    component: VolunteerDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['volunteer'] },
    children: [
      { path: 'news', component: NewsComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'register-refugee', component: RegisterRefugeeComponent },
      { path: '', redirectTo: 'news', pathMatch: 'full' },
    ]
  },
  {
    path: 'refugee',
    component: RefugeeDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['refugee'] },
    children: [
      { path: 'news', component: NewsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'status', component: StatusComponent },
      { path: '', redirectTo: 'news', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
