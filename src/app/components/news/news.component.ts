import { Component, OnInit } from '@angular/core';
import { NewsapiserviceService } from '../../services/newsapiservice.service'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private _news: NewsapiserviceService) { }

  ukraineNewsDisplay: any = [];

  ngOnInit(): void {

    this._news.ukraineNews().subscribe((res) => {

      console.log(res);
      this.ukraineNewsDisplay = res.articles;

    })
  }

}
