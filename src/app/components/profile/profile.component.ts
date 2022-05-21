import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Refugee } from 'src/app/models/refugee';
import { RefugeeService } from 'src/app/services/refugee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  refugee: Refugee = new Refugee();

  updateForm = new FormGroup({
    email: new FormControl({ value: '', disabled: true }),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
  })

  constructor(private refugeeService: RefugeeService) { }

  initializeFormGroup() {
    this.updateForm.setValue({
      email: this.refugee.email,
      firstName: this.refugee.firstName,
      lastName: this.refugee.lastName,
      phoneNumber: this.refugee.telephone
    });
  }

  ngOnInit(): void {
    this.refugeeService.userData.subscribe((res: any) => {
      this.refugee = res;
      this.initializeFormGroup();
    })
  }

  get firstName() {
    return this.updateForm.get('firstName');
  }

  get lastName() {
    return this.updateForm.get('lastName');
  }

  get phoneNumber() {
    return this.updateForm.get('phoneNumber');
  }

  get email() {
    return this.updateForm.get('email');
  }

  async submit() {
    if (!this.updateForm.valid) {
      return;
    }

    const { firstName, lastName, phoneNumber } = this.updateForm.value;

    this.refugee = {
      email: this.refugee.email,
      firstName: firstName,
      lastName: lastName,
      telephone: phoneNumber
    }

    this.refugeeService.updateRefugee(this.refugee);

  }

}
