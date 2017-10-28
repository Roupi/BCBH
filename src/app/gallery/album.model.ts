import {GalleryImage} from "./GalleryImage.model";
import {Observable} from "rxjs/Observable";

export class Album {
  name: string;
  pics: Observable<GalleryImage[]>;
}

