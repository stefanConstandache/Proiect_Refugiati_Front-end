import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true
      };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-register-refugee',
  templateUrl: './register-refugee.component.html',
  styleUrls: ['./register-refugee.component.css']
})
export class RegisterRefugeeComponent implements OnInit {

  tokenUrl = "http://localhost:8180/auth/realms/PwebKeycloak/protocol/openid-connect/token";
  registerUrl = "http://localhost:8180/auth/admin/realms/PwebKeycloak/users"
  clientSecret = "kYIs5uTPAk3HDDCmXI4mpeBE1j2DuROK";
  accessToken = "";

  signUpForm = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  }, { validators: passwordMatchValidator })

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get phoneNumber() {
    return this.signUpForm.get('phoneNumber');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  async submit() {
    if (!this.signUpForm.valid) {
      return;
    }

    const { username, firstName, lastName, email, phoneNumber, password } = this.signUpForm.value;

    let body = new URLSearchParams();
    body.set("client_id", "admin-cli");
    body.set("client_secret", "lj27GSPyDPvTeR8N6BhCT96dKKuxtOBk");
    body.set("grant_type", "client_credentials");

    let header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let options = { headers: header };

    let userData = {
      "enabled": "true",
      "username": username,
      "email": email,
      "firstName": firstName,
      "lastName": lastName,
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

    await lastValueFrom(this.http.post(this.tokenUrl, body, options)).then((res: any) => {
      this.accessToken = res.access_token;

    }).then(() => {
      let registerHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      });

      let registerOptions = { headers: registerHeader };
      lastValueFrom(this.http.post(this.registerUrl, userData, registerOptions)).then(() => {
        location.reload();
      }).catch((err: any) => {
        console.log(err.error.errorMessage);
      });
    });
  }

}
