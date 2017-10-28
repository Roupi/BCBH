import {Component, OnInit} from '@angular/core';
import {Competitor} from "../competitor.model";
import {ActivatedRoute, Params} from "@angular/router";
import {CompetitorsService} from "../competitors.service";

@Component({
  selector: 'app-competitor-item',
  templateUrl: './competitor-item.component.html',
  styleUrls: ['./competitor-item.component.scss']
})
export class CompetitorItemComponent implements OnInit {

  competitor: Competitor;

  constructor(private route: ActivatedRoute,
              private competitorsService: CompetitorsService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.competitor = this.competitorsService.getCompetitor(params['id']);
        }
      );
  }

}
