import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { lastValueFrom, } from 'rxjs';
import { Volunteer } from 'src/app/models/volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';

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
  selector: 'app-register-volunteer',
  templateUrl: './register-volunteer.component.html',
  styleUrls: ['./register-volunteer.component.css']
})

export class RegisterVolunteerComponent implements OnInit {

  // tokenUrl = "http://localhost:8180/auth/realms/master/protocol/openid-connect/token";
  // tokenUrl = "http://localhost:8180/auth/realms/PwebKeycloak/protocol/openid-connect/token";
  // registerUrl = "http://localhost:8180/auth/admin/realms/PwebKeycloak/users"

  // tokenUrl = "http://idp_keycloak:8080/auth/realms/PwebKeycloak/protocol/openid-connect/token";
  // registerUrl = "http://idp_keycloak:8080/auth/admin/realms/PwebKeycloak/users"

  tokenUrl = "http://localhost:8080/auth/realms/PwebKeycloak/protocol/openid-connect/token";
  registerUrl = "http://localhost:8080/auth/admin/realms/PwebKeycloak/users"


  // clientSecret = "lj27GSPyDPvTeR8N6BhCT96dKKuxtOBk";
  clientSecret = "EUR4oE8Oji2incmeqVWwsEqaVGLQLJoJ";

  accessToken = "";
  volunteer: Volunteer = new Volunteer();

  signUpForm = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  }, { validators: passwordMatchValidator })

  constructor(private volunteerService: VolunteerService) { }

  ngOnInit(): void {
  }

  initializeFormGroup() {
    this.signUpForm.setValue({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    });
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

    this.volunteer = {
      username: username,
      password: password,
      email: email,
      telephone: phoneNumber,
      firstName: firstName,
      lastName: lastName
    }

    this.volunteerService.createVolunteer(this.volunteer);
    this.initializeFormGroup();
  }
}
