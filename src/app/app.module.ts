import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { initializer } from 'src/utils/app-init';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';

// Services
import { NewsapiserviceService } from './services/newsapiservice.service'
import { RefugeeService } from './services/refugee.service';
import { RequestService } from './services/request.service';
import { VolunteerService } from './services/volunteer.service';

// Keycloak import
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

//Mats import
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

// Components import
import { AppComponent } from './app.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { VolunteerDashboardComponent } from './components/dashboards/volunteer-dashboard/volunteer-dashboard.component';
import { RefugeeDashboardComponent } from './components/dashboards/refugee-dashboard/refugee-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterVolunteerComponent } from './components/register-volunteer/register-volunteer.component';
import { RegisterRefugeeComponent } from './components/register-refugee/register-refugee.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatusComponent } from './components/status/status.component';
import { RequestsComponent } from './components/requests/requests.component';
import { NewsComponent } from './components/news/news.component';
import { CreateRequestDialogComponent } from './components/create-request-dialog/create-request-dialog.component';
import { FeedbackDialogComponent } from './components/feedback-dialog/feedback-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutButtonComponent,
    AdminDashboardComponent,
    VolunteerDashboardComponent,
    RefugeeDashboardComponent,
    HomeComponent,
    RegisterVolunteerComponent,
    RegisterRefugeeComponent,
    ProfileComponent,
    StatusComponent,
    RequestsComponent,
    NewsComponent,
    CreateRequestDialogComponent,
    FeedbackDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    FormsModule,

    // Mats
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatNativeDateModule,

    HotToastModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [KeycloakService],
      multi: true,
    },
    NewsapiserviceService,
    RefugeeService,
    VolunteerService,
    RequestService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
