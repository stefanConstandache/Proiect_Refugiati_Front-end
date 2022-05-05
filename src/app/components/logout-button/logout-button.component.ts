import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
  }

  logout() {
    this.keycloakService.logout();
  }

}
