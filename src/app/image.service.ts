import { Injectable } from '@angular/core';
import { Observable} from "rxjs/Observable"
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import 'firebase/storage';
import * as firebase from 'firebase';
import {GalleryImage} from "./gallery/GalleryImage.model";
import {Subject} from "rxjs/Subject";
@Injectable()
export class ImageService {

  private uid: string;
  albumsNames: string[] = [];
  albumsNamesChanged = new Subject<string[]>();

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth =>{
      if (auth !== undefined && auth !== null){
        this.uid = auth.uid;
      }
    });
  }

  getImages(albumName: string): Observable<GalleryImage[]>{
    return this.db.list('uploads/' + albumName);
  }

  getImage(key: string){
    return firebase.database().ref('uploads/' + key).once('value')
      .then((snap) => snap.val());
  }


  addAlbumName(albumName: string){
    this.albumsNames.push(albumName);
    this.albumsNamesChanged.next(this.albumsNames.slice());
  }

  setAlbumsNames(albumsNames: string[]) {
    this.albumsNames = albumsNames;
    if (albumsNames) {
      this.albumsNamesChanged.next(this.albumsNames.slice());
    }
  }

}
