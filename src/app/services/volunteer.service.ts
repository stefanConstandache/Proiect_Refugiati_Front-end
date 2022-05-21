import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, lastValueFrom, Observable } from 'rxjs';
import { Volunteer } from '../models/volunteer';
import { HotToastService } from '@ngneat/hot-toast';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  userData: Observable<KeycloakProfile> = new Observable;

  constructor(private http: HttpClient, private toast: HotToastService, private keycloak: KeycloakService) {
    this.getUserData();
  }

  getUserData() {
    this.userData = from(this.keycloak.loadUserProfile())
  }

  async createVolunteer(volunteer: Volunteer) {

    const tokenUrl = "http://localhost:8180/auth/realms/PwebKeycloak/protocol/openid-connect/token";
    const registerUrl = "http://localhost:8180/auth/admin/realms/PwebKeycloak/users"
    const clientSecret = "kYIs5uTPAk3HDDCmXI4mpeBE1j2DuROK";

    let body = new URLSearchParams();
    body.set("client_id", "admin-cli");
    body.set("client_secret", `${clientSecret}`);
    body.set("grant_type", "client_credentials");

    let header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let options = { headers: header };

    let userData = {
      "enabled": "true",
      "username": volunteer.username,
      "email": volunteer.email,
      "firstName": volunteer.firstName,
      "lastName": volunteer.lastName,
      "credentials": [
        {
          "type": "password",
          "value": volunteer.password,
          "temporary": "false"
        }
      ],
      "groups": [
        "volunteers"
      ]
    };

    await lastValueFrom(this.http.post(tokenUrl, body, options)).then((res: any) => {
      let registerHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + res.access_token
      });

      let registerOptions = { headers: registerHeader };
      lastValueFrom(this.http.post(registerUrl, userData, registerOptions)).then(() => {
        this.toast.success("Volunteer registered successfully");
      }).catch((err: any) => {
        this.toast.error(err.error.errorMessage);
      });
    });
  }
}
