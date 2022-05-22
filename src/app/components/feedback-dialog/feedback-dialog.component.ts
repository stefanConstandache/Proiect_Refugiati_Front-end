import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Refugee } from 'src/app/models/refugee';
import { Request } from 'src/app/models/request';
import { RefugeeService } from 'src/app/services/refugee.service';
import { RequestService } from 'src/app/services/request.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {

  feedbackForm: FormGroup = new FormGroup({
    feedback: new FormControl('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private requestService: RequestService, private refugeeService: RefugeeService, public dialogRef: MatDialogRef<FeedbackDialogComponent>) {
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  initializeFormGroup() {
    this.feedbackForm.setValue({
      feedback: '',
    });
  }
  get feedback() {
    return this.feedbackForm.get('feedback');
  }

  clear() {
    this.feedbackForm.reset();
    this.initializeFormGroup();
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (!this.feedbackForm.valid) {
      return;
    }

    const { feedback } = this.feedbackForm.value;

    if (this.data.type == "Rejected") {
      if (confirm("Are you sure you want to reject the request?")) {
        this.data.request.requestStatus = "Rejected";
        this.data.request.acceptedBy = "No one";
        this.requestService.rejectRequest(this.data.request, feedback);
      }
    } else if (this.data.type == "Completed") {
      if (confirm("Are you sure you want to complete the request?")) {
        this.data.request.requestStatus = "Completed";
        this.requestService.completeRequest(this.data.request, feedback);
      }
    }

    this.close();
  }

}
