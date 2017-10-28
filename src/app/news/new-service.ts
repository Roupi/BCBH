

import {Injectable} from "@angular/core";
import {News} from "./news-model";
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";

@Injectable()
export class NewsService{

  news: News[] = [];
  newsChanged = new Subject<News[]>();
  newsPrevPic = new Subject<string>();

  setNews(news: News[]){
    this.news = news;
    this.newsChanged.next(this.news.slice());
  }

  getAllNews(){
    return this.news.slice();
  }

  getNews(idx: number){
    return this.news[idx];
  }

  updateNews(idx: number, news: News){
    this.news[idx] = news;
    this.newsChanged.next(this.news.slice());
  }

  addNews(newNews: News){
    this.news.push(newNews);
    this.newsChanged.next(this.news.slice());
  }

  deleteNews(idx: number){
        this.news.splice(idx, 1);
        this.newsChanged.next(this.news.slice());
  }



}
