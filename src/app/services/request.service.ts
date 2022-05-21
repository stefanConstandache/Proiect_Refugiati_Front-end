import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../models/request';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient, private toast: HotToastService) { }

  createRequest(request: Request) {
    const apiUrl = "http://localhost:8888/api/createRequest";

    this.http.post(apiUrl, request).subscribe();
    this.toast.success("Request created successfully");
  }

  acceptRequest(request: Request) {
    const apiUrl = "http://localhost:8888/api/acceptRequest";

    this.http.put(apiUrl, request).subscribe();
    this.toast.success("Request accepted successfully");
  }

  rejectRequest(request: Request) {
    const apiUrl = "http://localhost:8888/api/rejectRequest";

    this.http.put(apiUrl, request).subscribe();
    this.toast.success("Request rejected successfully");
  }

  completeRequest(request: Request) {
    const apiUrl = "http://localhost:8888/api/completeRequest";

    this.http.put(apiUrl, request).subscribe();
    this.toast.success("Request completed successfully");
  }

  getAllRequests(): Observable<Request[]> {
    const apiUrl = "http://localhost:8888/api/getAllRequests";

    return this.http.get<Request[]>(apiUrl);
  }

  getRequestsForUser(email: string): Observable<Request[]> {
    const apiUrl = "http://localhost:8888/api/getRequestsForUser";

    return this.http.get<Request[]>(`${apiUrl}/${email}`);
  }
}
