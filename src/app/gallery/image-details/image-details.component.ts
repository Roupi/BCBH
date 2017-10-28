import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ImageService} from "../../image.service";

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {

  private imgUrl = '';

  constructor(private router: Router,
              private imageService: ImageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getImageUrl(this.route.snapshot.params['id']);
  }

  getImageUrl(key: string){
    this.imageService.getImage(key)
      .then(img => {
        this.imgUrl = img.url;
        console.log(this.imgUrl);
      });

  }

}
