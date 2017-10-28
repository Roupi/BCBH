import {Component, OnDestroy, OnInit} from '@angular/core';
import {News} from "../../news/news-model";
import {Subscription} from "rxjs/Subscription";
import {DataManagementService} from "../../data-management.service";
import {NewsService} from "../../news/new-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.scss']
})
export class NewsManagementComponent implements OnInit, OnDestroy {

  news: News[];
  newsSubscription: Subscription;
  selectedNewsPic: string;
  newsPrevPicSubscription: Subscription;

  constructor(
    private newsService: NewsService,
    private dataManagementService: DataManagementService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.dataManagementService.getNews();
    this.news = this.newsService.news;
    this.newsSubscription = this.newsService.newsChanged
      .subscribe(
        (news: News[]) => {
          this.news = news;
        }
      );

    this.newsPrevPicSubscription = this.newsService.newsPrevPic
      .subscribe(
        (prevPic: string) => {
          this.selectedNewsPic = prevPic;
        }
      );
  }

  ngOnDestroy(){
    this.newsSubscription.unsubscribe();
    this.newsPrevPicSubscription.unsubscribe();
  }
}
