import {Component, OnDestroy, OnInit} from '@angular/core';
import {Responsable} from "../../infos/responsable-item/responsable.model";
import {Subscription} from "rxjs/Subscription";
import {ResponsableService} from "../../infos/responsable.service";
import {DataManagementService} from "../../data-management.service";

@Component({
  selector: 'app-responsables-management',
  templateUrl: './responsables-management.component.html',
  styleUrls: ['./responsables-management.component.scss']
})
export class ResponsablesManagementComponent implements OnInit, OnDestroy {

  responsables: Responsable[];
  responsableSubscription: Subscription;
  prevPicSubscription: Subscription;
  selectedResponsablePic: string;

  constructor(
    private responsablesService: ResponsableService,
    private dataManagementService: DataManagementService
  ) { }

  ngOnInit() {
    this.dataManagementService.getResponsables();
    this.responsables = this.responsablesService.getResponsables();
    this.responsableSubscription = this.responsablesService.responsablesChanged
      .subscribe(
        (responsables: Responsable[]) => {
          this.responsables = responsables;
        }
      );
    this.prevPicSubscription = this.responsablesService.prevPicChanged
      .subscribe(
        (prevpic: string) => {
          this.selectedResponsablePic = prevpic;
        }
      );
  }

  ngOnDestroy(){
    this.responsableSubscription.unsubscribe();
    this.responsableSubscription.unsubscribe();
  }

}
