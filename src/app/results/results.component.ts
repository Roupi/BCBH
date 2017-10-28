import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataManagementService} from "../data-management.service";
import {CompetitorsService} from "../competitors/competitors.service";
import {Competitor} from "../competitors/competitor.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  results: {year: number, lastName: string[], firstName: string[], descriptions: string[]}[];
  competitors: Competitor[];
  competitorSubscription: Subscription;

  constructor(
    private competitorsService: CompetitorsService,
    private dataManagementService: DataManagementService
  ) {}

  ngOnInit() {
    this.dataManagementService.getCompetitors();
    this.competitors = this.competitorsService.competitors;
    this.competitorSubscription = this.competitorsService.competitorsChanged
      .subscribe(
        (competitors: Competitor[]) => {
          this.competitors = competitors;
          this.results = this.fetchResults(this.competitors);
        }
      );
  }

  ngOnDestroy(){
    this.competitorSubscription.unsubscribe();
  }

  //If an object for year is present in the array, returns the index, else return -1
  private isYearPresent(array: {year: number, lastName: string[], firstName: string[], descriptions: string[]}[], year: number){
    let i = 0;
    for (let item of array){
      if (item.year === year){
        return i;
      }
      i++;
    }
    return -1;
  }

  private fetchResults(competitors: Competitor[]){
    console.log('Converting results..')
    let allResults: {year: number, lastName: string[], firstName: string[], descriptions: string[]}[] = [];
    let y: number;
    let i = 0;
    allResults = [];
    for (let comp of this.competitors){
      for (let res of comp.results){
        y = this.isYearPresent(allResults, res.year);

        if (y === -1){
            allResults[i] = {
              year: res.year,
              lastName: [],
              firstName: [],
              descriptions: []
            };
            y = i;
            i++;
          }

          allResults[y].firstName.push(comp.firstname);
          allResults[y].lastName.push(comp.lastname);
          allResults[y].descriptions.push(res.description);

          console.log('Adding ' + res.description + ' to ' + res.year);
      }
    }
    return allResults;
  }

}
