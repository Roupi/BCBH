import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from "../image.service";
import {Observable} from "rxjs/Observable";
import {GalleryImage} from "./GalleryImage.model";
import {DataManagementService} from "../data-management.service";
import {Subscription} from "rxjs/Subscription";
import {Album} from "./album.model";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {


  albums: Album[] = []
  albumsNames: string[] = [];
  albumsNamesSubscription: Subscription;

  constructor(
    private imageService: ImageService,
    private dataManagementService: DataManagementService) { }

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

}
