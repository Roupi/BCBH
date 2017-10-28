import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataManagementService} from "../data-management.service";
import {NewsService} from "./new-service";
import {News} from "./news-model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  news: News[];
  newsSubscription: Subscription;

  constructor(
    private dataManagementService: DataManagementService,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.dataManagementService.getNews();
    this.news = this.newsService.getAllNews();
    this.newsSubscription = this.newsService.newsChanged
      .subscribe(
        (news: News[]) => {
          this.news = news;
        }
      );
  }

  ngOnDestroy(){
    this.newsSubscription.unsubscribe();
  }

}
