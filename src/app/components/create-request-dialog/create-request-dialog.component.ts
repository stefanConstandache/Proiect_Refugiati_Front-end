import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Refugee } from 'src/app/models/refugee';
import { Request } from 'src/app/models/request';
import { RefugeeService } from 'src/app/services/refugee.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-create-request-dialog',
  templateUrl: './create-request-dialog.component.html',
  styleUrls: ['./create-request-dialog.component.css']
})
export class CreateRequestDialogComponent implements OnInit {

  refugee: Refugee = new Refugee();
  remainingText = 1000;
  request: Request = new Request(undefined);

  requestForm: FormGroup = new FormGroup({
    userNotes: new FormControl('', Validators.required),
    requestType: new FormControl('', Validators.required),
  });

  constructor(private requestService: RequestService, private refugeeService: RefugeeService, public dialogRef: MatDialogRef<CreateRequestDialogComponent>) {
    this.refugeeService.userData.subscribe((res: any) => {
      this.refugee = res;
    })
  }

  ngOnInit(): void {
  }


  initializeFormGroup() {
    this.requestForm.setValue({
      userNotes: '',
      requestType: '',
    });
  }

  get userNotes() {
    return this.requestForm.get('userNotes');
  }

  get requestType() {
    return this.requestForm.get('requestType');
  }

  clear() {
    this.requestForm.reset();
    this.initializeFormGroup();
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (!this.requestForm.valid) {
      return;
    }

    const { userNotes, requestType } = this.requestForm.value;

    this.request = {
      userNotes: userNotes,
      requestType: requestType,
      requestStatus: "Pending...",
      createdOn: new Date(Date.now()),
      acceptedBy: "No one yet",
      refugeeEmail: this.refugee.email,
      id: undefined
    }

    this.requestService.createRequest(this.request);
    this.close();
  }

  valueChange() {
    if (this.requestForm.value.userNotes == null) {
      this.remainingText = 1000;
    } else {
      this.remainingText = 1000 - this.requestForm.value.userNotes.length;
    }
  }

}
