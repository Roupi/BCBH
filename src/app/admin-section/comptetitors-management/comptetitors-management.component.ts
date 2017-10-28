import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompetitorsService} from "../../competitors/competitors.service";
import {Competitor} from "../../competitors/competitor.model";
import {DataManagementService} from "../../data-management.service";
import {Subscription} from "rxjs/Subscription";
import {Response} from "@angular/http";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-comptetitors-management',
  templateUrl: './comptetitors-management.component.html',
  styleUrls: ['./comptetitors-management.component.scss']
})
export class ComptetitorsManagementComponent implements OnInit, OnDestroy{

  competitors: Competitor[];
  competitorSubscription: Subscription;
  previewPicSubscription: Subscription;
  selectedCompPic: string;

  constructor(
    private competitorsService: CompetitorsService,
    private dataManagementService: DataManagementService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.dataManagementService.getCompetitors();
    this.competitors = this.competitorsService.competitors;
    this.competitorSubscription = this.competitorsService.competitorsChanged
      .subscribe(
        (competitors: Competitor[]) => {
          this.competitors = competitors;
        }
      );
    this.previewPicSubscription = this.competitorsService.previewPicChanged
      .subscribe(
        (previewPicUrl: string) => {
          this.selectedCompPic = previewPicUrl;
        }
      );
  }

  ngOnDestroy(){
    this.competitorSubscription.unsubscribe();
    this.previewPicSubscription.unsubscribe();
  }

}
