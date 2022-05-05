import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { initializer } from 'src/utils/app-init';

// Keycloak import
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

//Mats import
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

// Components import
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LogoutButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeycloakAngularModule,

    // Mats
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [KeycloakService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
