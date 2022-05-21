import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RequestService } from 'src/app/services/request.service';
import { CreateRequestDialogComponent } from '../create-request-dialog/create-request-dialog.component';
import { RefugeeDashboardComponent } from '../dashboards/refugee-dashboard/refugee-dashboard.component';
import { RefugeeService } from 'src/app/services/refugee.service';
import { Request } from 'src/app/models/request';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  myRequests: any; // List with Objects
  myRequestsList: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  searchKey: string = "";

  constructor(private requestService: RequestService, private refugeeService: RefugeeService, private dialog: MatDialog, private toast: HotToastService) {
    this.myRequestsList = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.displayedColumns = [
      "requestStatus",
      "requestType",
      "userNotes",
      "createdOn",
      "acceptedBy",
    ];

    this.refugeeService.userData.subscribe((res: any) => {
      this.requestService.getRequestsForUser(res.email).subscribe((data: any) => {
        this.myRequests = data;

        this.myRequestsList = new MatTableDataSource(this.myRequests);
        this.myRequestsList.sort = this.sort;
        this.myRequestsList.paginator = this.paginator;
      })
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.myRequestsList.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "510px";
    this.dialog.open(CreateRequestDialogComponent, dialogConfig);
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

}
