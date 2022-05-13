import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

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

  constructor() {
    this.requestsList = new MatTableDataSource();
  }

  ngOnInit(): void {

    this.displayedColumns = [
      "actions",
      "requestStatus",
      "requestType",
      "userNotes",
      "name",
      "telephone",
      "email",
      "createdOn",
      "acceptedBy",
    ];

    //this.requests = data;

    this.requestsList = new MatTableDataSource(this.requests);
    this.requestsList.sort = this.sort;
    this.requestsList.paginator = this.paginator;
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.requestsList.filter = this.searchKey.trim().toLowerCase();
  }

  // To implement, in a service component,
  // what happens when you press the action buttons
  //TO DO:
  // onRequestAccepted() {

  // }

  //TO DO:
  // onRequestRejected() {

  // }

  //TO DO:
  // onRequestCompleted() {

  // }

}
