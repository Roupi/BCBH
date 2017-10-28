import {Component, OnDestroy, OnInit} from '@angular/core';
import {Competitor} from "./competitor.model";
import {CompetitorsService} from "./competitors.service";
import {DataManagementService} from "../data-management.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.scss']
})
export class CompetitorsComponent implements OnInit, OnDestroy {
    competitors: Competitor[];
    competitorSubscription: Subscription;

    constructor(
      private competitorsService: CompetitorsService,
      private dataManagementService: DataManagementService,
      private route: ActivatedRoute,
      private router: Router
    ) {}

  ngOnInit() {
      this.dataManagementService.getCompetitors();
      this.competitors = this.competitorsService.competitors;
      this.competitorSubscription = this.competitorsService.competitorsChanged
      .subscribe(
        (competitors: Competitor[]) => {
          this.competitors = competitors;
        }
      );
  }

  ngOnDestroy(){
    this.competitorSubscription.unsubscribe();
  }

}
