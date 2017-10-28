import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CompetitorsService} from "../../../competitors/competitors.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataManagementService} from "../../../data-management.service";
import {Response} from '@angular/http';
import {Competitor} from "../../../competitors/competitor.model";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Upload} from "../../upload.model";
import * as _ from 'lodash';
import {ImageService} from "../../../image.service";

@Component({
  selector: 'app-competitor-edit',
  templateUrl: './competitor-edit.component.html',
  styleUrls: ['./competitor-edit.component.scss']
})
export class CompetitorEditComponent implements OnInit, OnDestroy {

            categories: string[];
            competitorForm: FormGroup;
            editMode = true;
            competitorSubscription: Subscription;
            id: string;
            files: FileList;
            upload: Upload;
            pictureUpdated = false; //True if pictureRef element must be reassigned
            newPictureUrl: string;
            pictureLoaded = true; //Help to disable the submit button while picture is loading(url must be created before submit)

  constructor(
    private competitorsService: CompetitorsService,
    private dataManagementService: DataManagementService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = !(params['id'] === 'new');
          console.log('id : ' + this.id + ' editMode : ' + this.editMode);
          if (!this.editMode){
            this.competitorsService.previewPicChanged.next('new');
          }
          this.initForm();
        }
      );

    this.dataManagementService.getCompetitors();
    this.categories = this.competitorsService.categories;
    this.initForm();
    this.competitorSubscription = this.competitorsService.competitorsChanged
      .subscribe(
        (competitors: Competitor[]) => {
              this.initForm();
        }
      );
  }

  ngOnDestroy(){
    this.competitorSubscription.unsubscribe();
    this.competitorsService.previewPicChanged.next('');
  }

  onSubmit(){
    let newCompetitor: Competitor = this.competitorForm.value;
    newCompetitor.id = newCompetitor.firstname.toLowerCase() + newCompetitor.lastname.toLowerCase(); //ID actualisation if name changed
    if (this.pictureUpdated){
      newCompetitor.pictureRef = this.newPictureUrl;
      console.log('pictureRef updated :' + newCompetitor.pictureRef);
    } else {
      newCompetitor.pictureRef = this.competitorsService.getCompetitor(this.id).pictureRef; //Preserve old pic (rewritten bu form)
    }
    if (this.editMode) {

      this.competitorsService.updateCompetitor(this.id, newCompetitor);
      this.dataManagementService.storeCompetitors();
    } else {

        this.competitorsService.addCompetitor(newCompetitor);
        this.dataManagementService.storeCompetitors();
    }
    this.onCancel();
  }

  onCancel(){
    this.competitorsService.previewPicChanged.next('');
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddResult() {
    (<FormArray>this.competitorForm.get('results')).push(
      new FormGroup({
        'description': new FormControl(null, Validators.required),
        'year': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteResult(index: number) {
    (<FormArray>this.competitorForm.get('results')).removeAt(index);
  }

  onDeleteCompetitor(id: string){
    this.competitorsService.deleteCompetitor(id);
    this.dataManagementService.storeCompetitors();
    this.onCancel();
  }


  handlePicture(event){
    console.log('Picture handled');
    this.files = event.target.files;
  }

  uploadPicture(){
    const filesToUpload = this.files;
    const filesIdx = _.range(filesToUpload.length);
    _.each(filesIdx, (idx) => {
      this.upload = new Upload(filesToUpload[idx]);
      this.pictureLoaded = false;
      const urlSubject = this.dataManagementService.uploadFile(this.upload, '/competitors_pic');
      urlSubject.subscribe( (url: string) => {
          this.newPictureUrl = url;
          this.pictureLoaded = true;
          this.competitorsService.previewPicChanged.next(this.newPictureUrl);
          console.log('The new pictureUrl is ' + this.newPictureUrl);
        } );
    });
    this.pictureUpdated = true;
  }


  private initForm(){
    let firstName = '';
    let lastName = '';
    let category = '';
    let pictureURL = '';
    let results = new FormArray([]);

    if(this.editMode){
      const competitor = this.competitorsService.getCompetitor(this.id);
      if (competitor){
        this.competitorsService.previewPicChanged.next(
          competitor.pictureRef === '' ? 'NoPicture' : competitor.pictureRef);
        firstName = competitor.firstname;
        lastName = competitor.lastname;
        category = competitor.category;
        if (competitor['results']) {
          for (let res of competitor.results) {
            results.push(
              new FormGroup({
                'description': new FormControl(res.description, [Validators.required]),
                'year': new FormControl(res.year, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }

      }
    }

    this.competitorForm = new FormGroup({
      'firstname' : new FormControl(firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[aA-zZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-\s]+$/)]),
      'lastname' : new FormControl(lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[aA-zZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-\s]+$/)]),
      'category' : new FormControl(category, Validators.required),
      'pictureRef': new FormControl(pictureURL),
      'results' : results
    });
  }
}
