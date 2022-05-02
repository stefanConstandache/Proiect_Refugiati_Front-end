import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Auth0 import
import { AuthModule } from '@auth0/auth0-angular';

//Mats import
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

// Components import
import { AppComponent } from './app.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    NavBarComponent,
    LogoutButtonComponent,
    LoadingComponent
  ],
  imports: [
    AuthModule.forRoot({
      domain: 'dev-8lbidwng.us.auth0.com',
      clientId: 'aml8O9DBSzFzfyYTRaJenFgQj8jlFfqG',
      audience: 'http://localhost:8080',
      roleskey: 'http://localhost:8080/roles'
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Mats
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
