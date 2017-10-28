import {Component, OnDestroy, OnInit} from '@angular/core';
import {Responsable} from "./responsable-item/responsable.model";
import {ResponsableService} from "./responsable.service";
import {DataManagementService} from "../data-management.service";
import {ImageService} from "../image.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit, OnDestroy {

  responsables: Responsable[]
  responsableSubscription: Subscription;

  constructor(
    private responsableService: ResponsableService,
    private dataManagementService: DataManagementService,
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.dataManagementService.getResponsables();
    this.responsables = this.responsableService.getResponsables();
    this.responsableSubscription = this.responsableService.responsablesChanged
      .subscribe(
        (responsables: Responsable[]) => {
          this.responsables = responsables;
          console.log('Responsables updated');
        }
      );
  }

  ngOnDestroy(){
    this.responsableSubscription.unsubscribe();
  }

}
