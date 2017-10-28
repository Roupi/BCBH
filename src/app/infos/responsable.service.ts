
import {Injectable} from "@angular/core";
import {Responsable} from "./responsable-item/responsable.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ResponsableService{


  responsables: Responsable[] = [];
  responsablesChanged = new Subject<Responsable[]>();
  prevPicChanged = new Subject<string>();

  constructor(){}


  setResponsables(responsables: Responsable[]){
    this.responsables = responsables;
    this.responsablesChanged.next(this.responsables.slice());
  }

  getResponsables(){
    return this.responsables.slice();
  }

  getResponsable(id: string){
    for (let resp of this.responsables){
      if (resp.id === id){
        return resp;
      }
    }
  }

  updateResponsable(id:string, responsable: Responsable){
    let i = 0;
    for(let resp of this.responsables){
      if(resp.id === id){
        this.responsables[i] = responsable;
      }
      i++;
    }
    this.responsablesChanged.next(this.responsables.slice());
  }

  addResponsable(newResponsable: Responsable){
    this.responsables.push(newResponsable);
    this.responsablesChanged.next(this.responsables.slice());
  }

  deleteResponsable(id: string){
    let i = 0;
    for (let resp of this.responsables){
      if (resp.id === id){
        this.responsables.splice(i, 1);
        this.responsablesChanged.next(this.responsables.slice());
      }
      i++;
    }
  }


}
