import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, lastValueFrom, Observable } from 'rxjs';
import { Refugee } from '../models/refugee';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class RefugeeService {

  userData: Observable<Refugee> = new Observable;

  constructor(private http: HttpClient, private keycloak: KeycloakService, private toast: HotToastService) {
    this.getUserData();
  }

  getRefugee(email: string): Observable<Refugee> {
    // const apiUrl = "http://localhost:8888/api/getRefugee";
    const apiUrl = "http://idp_spring_boot_api:8888/api/getRefugee";

    return this.http.get<Refugee>(`${apiUrl}/${email}`);
  }

  getUserData() {
    this.keycloak.loadUserProfile().then((userDetails: KeycloakProfile) => {
      this.userData = this.getRefugee(userDetails.email!);
    });
  }

  async createRefugee(username: string, password: string, refugee: Refugee) {
    // const tokenUrl = "http://localhost:8180/auth/realms/PwebKeycloak/protocol/openid-connect/token";
    // const registerUrl = "http://localhost:8180/auth/admin/realms/PwebKeycloak/users";
    // const apiUrl = "http://localhost:8888/api/createRefugee";

    const tokenUrl = "http://idp_keycloak:8080/auth/realms/PwebKeycloak/protocol/openid-connect/token";
    const registerUrl = "http://idp_keycloak:8080/auth/admin/realms/PwebKeycloak/users";
    const apiUrl = "http://idp_spring_boot_api:8888/api/createRefugee";

    // const clientSecret = "kYIs5uTPAk3HDDCmXI4mpeBE1j2DuROK";
    const clientSecret = "EUR4oE8Oji2incmeqVWwsEqaVGLQLJoJ";

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
      "username": username,
      "email": refugee.email,
      "firstName": refugee.firstName,
      "lastName": refugee.lastName,
      "credentials": [
        {
          "type": "password",
          "value": password,
          "temporary": "false"
        }
      ],
      "groups": [
        "refugees"
      ]
    };

    await lastValueFrom(this.http.post(tokenUrl, body, options)).then(async (res: any) => {
      let registerHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + res.access_token
      });
      let registerOptions = { headers: registerHeader };

      await lastValueFrom(this.http.post(registerUrl, userData, registerOptions)).then(() => {
        this.http.post(apiUrl, refugee).subscribe();
        this.toast.success("Refugee registered successfully");
      }).catch((err: any) => {
        this.toast.error(err.error.errorMessage);
      });
    });
  }

  async updateRefugee(refugee: Refugee) {
    // const apiUrl = "http://localhost:8888/api/updateRefugee";
    const apiUrl = "http://idp_spring_boot_api:8888/api/updateRefugee";

    this.http.put(apiUrl, refugee).subscribe();
    this.toast.success("Profile updated successfully");
  }
}
