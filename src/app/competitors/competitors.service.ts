import {Competitor} from "./competitor.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CompetitorsService {

  categories = [
    'poids lourds',
    'super légers',
    'mi-moyens',
    'moyens',
    'mini coqs',
    'mi-lourds',
    'légers',
    'plume',
    'coq'
    ];

  competitors: Competitor[] = [];
  competitorsChanged = new Subject<Competitor[]>();
  previewPicChanged = new Subject<string>();


  constructor(){}

  getCompetitor(id: string): Competitor {
    for (let competitor of this.competitors){
      if ( (competitor.id === id) ){
        return competitor;
      }
    }
  }

  setCompetitors(competitors: Competitor[]){
    this.competitors = competitors;
    this.competitorsChanged.next(this.competitors.slice());
  }

  updateCompetitor(id: string, newCompetitor: Competitor){
    let i = 0;
    for (let comp of this.competitors){
      if (comp.id === id){
        this.competitors[i] = newCompetitor;
      }
      i++;
    }
    this.competitorsChanged.next(this.competitors.slice());
  }

  addCompetitor(newCompetitor: Competitor){
    this.competitors.push(newCompetitor);
    this.competitorsChanged.next(this.competitors.slice());
  }

  deleteCompetitor(id: string){
    let i = 0;
    for (let comp of this.competitors){
      if (comp.id === id){
        this.competitors.splice(i, 1);
        this.competitorsChanged.next(this.competitors.slice());
       }
      i++;
    }
  }
}
