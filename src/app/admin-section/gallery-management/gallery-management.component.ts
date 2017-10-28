import {Component, OnDestroy, OnInit} from '@angular/core';
import {Upload} from "../upload.model";
import {DataManagementService} from "../../data-management.service";
import * as _ from 'lodash';
import {ImageService} from "../../image.service";
import {Response} from '@angular/http';
import {Album} from "../../gallery/album.model";
import {Subscription} from "rxjs/Subscription";
import {GalleryImage} from "../../gallery/GalleryImage.model";
import {Observable} from "rxjs/Observable";
@Component({
  selector: 'app-gallery-management',
  templateUrl: './gallery-management.component.html',
  styleUrls: ['./gallery-management.component.scss']
})
export class GalleryManagementComponent implements OnInit, OnDestroy {

  files: FileList;
  upload: Upload;
  albums: Album[] = [];
  albumsNames: string[] = [];
  albumsNamesSubscription: Subscription;
  albumName: string;

  constructor(private dataManagementService: DataManagementService,
              private imageService: ImageService) { }

  ngOnInit() {
    this.dataManagementService.getAlbumsNames();
    this.albumsNames = this.imageService.albumsNames;
    this.albumsNamesSubscription = this.imageService.albumsNamesChanged
      .subscribe(
        (names: string[]) => {
          this.albumsNames = names;
          let images: Observable<GalleryImage[]>;
          let al: Album;
          console.log('Albums retrieved from the Imageservice');
          for (let albName of this.albumsNames){
            console.log('Album ' + albName + ' retrieved' );
            images = this.imageService.getImages(albName);
            al = new Album();
            al.name = albName;
            al.pics =images;
            this.albums.push(al);
          }
        }
      );
  }

  ngOnDestroy(){
    this.albumsNamesSubscription.unsubscribe();
  }

  handleFiles(event){
    this.files = event.target.files;
  }

  uploadFiles(albumName: string){
    const filesToUpload = this.files;
    const filesIdx = _.range(filesToUpload.length);
    _.each(filesIdx, (idx) => {
      //console.log(filesToUpload[idx]);
      this.upload = new Upload(filesToUpload[idx]);
      this.dataManagementService.uploadFile(this.upload, '/uploads/' + albumName);
    });
    this.imageService.addAlbumName(albumName);
    this.dataManagementService.storeAlbumsNames();
  }

}
