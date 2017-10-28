import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Responsable} from "./responsable.model";
import {ResponsableService} from "../responsable.service";

@Component({
  selector: 'app-responsable-item',
  templateUrl: './responsable-item.component.html',
  styleUrls: ['./responsable-item.component.scss']
})
export class ResponsableItemComponent implements OnInit {

  responsable: Responsable;

  constructor(private route: ActivatedRoute,
              private responsableService: ResponsableService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.responsable = this.responsableService.getResponsable(params['id']);
        }
      );
  }

}
