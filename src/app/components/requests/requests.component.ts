import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/models/request';
import { KeycloakProfile } from 'keycloak-js';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  requests: any; // List with Objects
  requestsList: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  searchKey: string = "";
  volunteerData: KeycloakProfile | undefined;

  constructor(private requestService: RequestService, private volunteerService: VolunteerService, private toast: HotToastService) {
    this.requestsList = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.volunteerService.userData.subscribe((userData: KeycloakProfile) => {
      this.volunteerData = userData;
    });

    this.displayedColumns = [
      "actions",
      "requestStatus",
      "requestType",
      "userNotes",
      "email",
      "createdOn",
      "acceptedBy",
    ];

    this.requestService.getAllRequests().subscribe((data: any) => {
      this.requests = data;
      this.requestsList = new MatTableDataSource(this.requests);
      this.requestsList.sort = this.sort;
      this.requestsList.paginator = this.paginator;
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.requestsList.filter = this.searchKey.trim().toLowerCase();
  }

  onRequestAccepted(request: Request) {
    if (confirm("Are you sure you want to accept the request?")) {
      request.requestStatus = "Accepted"
      request.acceptedBy = `${this.volunteerData?.email}`;
      this.requestService.acceptRequest(request);
    }
  }

  onRequestRejected(request: Request) {
    if (confirm("Are you sure you want to reject the request?")) {
      request.requestStatus = "Rejected";
      request.acceptedBy = "No one";
      this.requestService.rejectRequest(request);
    }
  }

  onRequestCompleted(request: Request) {
    if (confirm("Are you sure you want to complete the request?")) {
      request.requestStatus = "Completed";
      this.requestService.completeRequest(request);
    }
  }

  seeUserNotes(element: Request) {
    this.toast.show(
      element.userNotes,
      {
        autoClose: false,
        dismissible: true
      }
    );
  }

  seeAcceptedBy(element: Request) {
    this.toast.show(
      element.acceptedBy,
      {
        autoClose: false,
        dismissible: true
      }
    );
  }

  seeRefugeeEmail(element: Request) {
    this.toast.show(
      element.refugeeEmail,
      {
        autoClose: false,
        dismissible: true
      }
    );
  }

}
