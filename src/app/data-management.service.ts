import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {CompetitorsService} from "./competitors/competitors.service";
import {Competitor} from "./competitors/competitor.model";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Upload} from "./admin-section/upload.model";
import * as firebase from 'firebase';
import {GalleryImage} from "./gallery/GalleryImage.model";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {ImageService} from "./image.service";
import {ResponsableService} from "./infos/responsable.service";
import {Responsable} from "./infos/responsable-item/responsable.model";
import {NewsService} from "./news/new-service";
import {News} from "./news/news-model";
import {AuthenticationService} from "./authentication.service";


@Injectable()
export class DataManagementService {

  private uploads: FirebaseListObservable<GalleryImage[]>;

  constructor(private http: Http,
              private competitorsService: CompetitorsService,
              private imageService: ImageService,
              private responsableService: ResponsableService,
              private newsService: NewsService,
              private ngFire: AngularFireModule,
              private db: AngularFireDatabase,
              private authService: AuthenticationService) {
  }

  storeCompetitors() {
    firebase.database().ref('competitors/').set(this.competitorsService.competitors);
   }


  storeAlbumsNames() {
    firebase.database().ref('albumsnames/').set(this.imageService.albumsNames);
  }

  storeResponsables() {
    firebase.database().ref('responsables/').set(this.responsableService.responsables);
  }

  storeNews() {
    firebase.database().ref('news/').set(this.newsService.news);
  }



  getCompetitors() {
    this.http.get('https://bcbh-4b8a4.firebaseio.com/competitors.json')
      .map(
        (response: Response) => {
          const competitors: Competitor[] = response.json();
          for (let competitor of competitors) {
            if (!competitor['results']) {
              competitor['results'] = [];
            }
          }
          return competitors;
        }
      )
      .subscribe(
        (competitors: Competitor[]) => {
          if(competitors){
            this.competitorsService.setCompetitors(competitors);
            console.log('Competitors fetched from database');
          }
        }
      );
  }

  getNews() {
    this.http.get('https://bcbh-4b8a4.firebaseio.com/news.json')
      .map(
        (response: Response) => {
          const news: News[] = response.json();
          return news;
        }
      )
      .subscribe(
        (news: News[]) => {
          if(news){
            this.newsService.setNews(news);
            console.log('News fetched from database');
          }
        }
      );
  }

  getResponsables(){
    this.http.get('https://bcbh-4b8a4.firebaseio.com/responsables.json')
      .map(
        (response: Response) => {
          const responsables: Responsable[] = response.json();
          for (let responsable of responsables) {
            if (!responsable['history']) {
              responsable['history'] = [];
            }
            if (!responsable['functions']) {
              responsable['functions'] = [];
            }
          }
          return responsables;
        }
      )
      .subscribe(
        (responsables: Responsable[]) => {
          if (responsables){
            this.responsableService.setResponsables(responsables);
            console.log('Responsables fetched from database');
          } else{
            console.log('No responsables element in the database');
          }
        }
      );
  }

  getAlbumsNames(): Subject<string[]> {
    let names = new Subject<string[]>();
    this.http.get('https://bcbh-4b8a4.firebaseio.com/albumsnames.json')
      .map(
        (response: Response) => {
          const albumsNames: string[] = response.json();
          return albumsNames;
        }
      )
      .subscribe(
        (albumsNames: string[]) => {
          this.imageService.setAlbumsNames(albumsNames);
        }
      );
    return names;
  }

  uploadFile(upload: Upload, basePath: string): Subject<string> {
    let url = new Subject<string>();
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${basePath}/${upload.file.name}`)
      .put(upload.file);


    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

      (snapshot) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes ) * 100;
        console.log(upload.progress);
      },

      (error) => {
        console.log(error);
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload, basePath);
        console.log('UPLOAD URL:' + upload.url);
        url.next(upload.url);
      }
  );
    return url;
  }

  private saveFileData(upload: Upload, basePath: string){
    this.db.list(`${basePath}`).push(upload);
    console.log('File saved');
  }
}
