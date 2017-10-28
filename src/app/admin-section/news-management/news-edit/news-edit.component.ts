import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {Upload} from "../../upload.model";
import {NewsService} from "../../../news/new-service";
import {DataManagementService} from "../../../data-management.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ImageService} from "../../../image.service";
import {News} from "../../../news/news-model";
import {Response} from "@angular/http";
import * as _ from 'lodash';
@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit, OnDestroy {

  newsForm: FormGroup;
  editMode = true;
  newsSubscription: Subscription;
  id: number;
  files: FileList;
  upload: Upload;
  pictureUpdated = false; //True if pictureRef element must be reassigned
  newPictureUrl: string;
  pictureLoaded = true; //Help to disable the submit button while picture is loading(url must be created before submit)

  constructor(
    private newsService: NewsService,
    private dataManagementService: DataManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = !(params['id'] === 'new');
          console.log('id : ' + this.id + ' editMode : ' + this.editMode);
          if (!this.editMode){
            this.newsService.newsPrevPic.next('new');
          }
          this.initForm();
        }
      );

    this.dataManagementService.getNews();
    this.initForm();
    this.newsSubscription = this.newsService.newsChanged
      .subscribe(
        (news: News[]) => {
          this.initForm();
        }
      );
  }

  ngOnDestroy(){
    this.newsSubscription.unsubscribe();
    this.newsService.newsPrevPic.next('');
  }

  onSubmit(){
    let newNews: News = this.newsForm.value;
    if (this.pictureUpdated){
      newNews.pictureRef = this.newPictureUrl;
      console.log('pictureRef updated :' + newNews.pictureRef);
    }
    if (this.editMode) {

      this.newsService.updateNews(this.id, newNews);
      this.dataManagementService.storeNews();
    } else {
      this.newsService.addNews(newNews);
      this.dataManagementService.storeNews();

    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
    this.newsService.newsPrevPic.next('');
  }

  onDeleteNews(id: number){
    this.newsService.deleteNews(id);
    this.dataManagementService.storeNews();
    this.onCancel();
  }


  handlePicture(event){
    this.files = event.target.files;
  }

  uploadPicture(){
    const filesToUpload = this.files;
    const filesIdx = _.range(filesToUpload.length);
    _.each(filesIdx, (idx) => {
      this.upload = new Upload(filesToUpload[idx]);
      this.pictureLoaded = false;
      const urlSubject = this.dataManagementService.uploadFile(this.upload, '/news_pic');
      urlSubject.subscribe( (url: string) => {
        this.newPictureUrl = url;
        this.pictureLoaded = true;
        this.newsService.newsPrevPic.next(this.newPictureUrl);
        console.log('The new pictureUrl is ' + this.newPictureUrl);
      } );
    });
    this.pictureUpdated = true;
  }


  private initForm(){
    let title = '';
    let content = '';
    let pictureURL = '';

    if(this.editMode){
      const news = this.newsService.getNews(this.id);
      if (news){
        console.log('picRef :' + news.pictureRef);
        this.newsService.newsPrevPic.next(
          news.pictureRef === '' ? 'NoPicture' : news.pictureRef);
        title = news.title;
        content = news.content;
      }
    }

    this.newsForm = new FormGroup({
      'title' : new FormControl(title, Validators.required),
      'content' : new FormControl(content, Validators.required),
      'pictureRef': new FormControl(pictureURL)
    });
  }
}
