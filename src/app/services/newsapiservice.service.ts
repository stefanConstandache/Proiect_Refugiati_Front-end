import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsapiserviceService {

  constructor(private _http: HttpClient) { }

  newsApiUrl = "https://newsapi.org/v2/everything?q=Ukraine+Vladimir+Putin+Russia+war+invasion+evacuation&from=2022-05-01&sortBy=publishedAt&apiKey=86f4142b27b8423893fabc060d2eaea0";

  ukraineNews(): Observable<any> {
    return this._http.get(this.newsApiUrl);
  }
}

