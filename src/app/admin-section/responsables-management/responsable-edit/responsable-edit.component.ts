import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {Upload} from "../../upload.model";
import {ResponsableService} from "../../../infos/responsable.service";
import {DataManagementService} from "../../../data-management.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ImageService} from "../../../image.service";
import {Responsable} from "../../../infos/responsable-item/responsable.model";
import {Response} from "@angular/http";
import * as _ from 'lodash';

@Component({
  selector: 'app-responsable-edit',
  templateUrl: './responsable-edit.component.html',
  styleUrls: ['./responsable-edit.component.scss']
})
export class ResponsableEditComponent implements OnInit, OnDestroy {

  responsableForm: FormGroup;
  editMode = true;
  responsableSubscription: Subscription;
  id: string;
  files: FileList;
  upload: Upload;
  pictureUpdated = false;
  newPictureUrl: string;
  pictureLoaded = true;

  constructor(
    private responsableService: ResponsableService,
    private dataManagementService: DataManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = !(params['id'] === 'new');
          console.log('id : ' + this.id + ' editMode : ' + this.editMode);
          if (!this.editMode){
            this.responsableService.prevPicChanged.next('new');
          }
          this.initForm();
        }
      );

    this.dataManagementService.getResponsables();
    this.initForm();
    this.responsableSubscription = this.responsableService.responsablesChanged
      .subscribe(
        (responsables: Responsable[]) => {
          this.initForm();
        }
      );
  }

  ngOnDestroy(){
    this.responsableSubscription.unsubscribe();
    this.responsableService.prevPicChanged.next('');
  }

  onSubmit(){
    let newResponsable: Responsable = this.responsableForm.value;
    newResponsable.id = newResponsable.firstname.toLowerCase() + newResponsable.lastname.toLowerCase(); //ID actualisation if name changed
    if (this.pictureUpdated){
      newResponsable.pictureRef = this.newPictureUrl;
      console.log('pictureRef updated :' + newResponsable.pictureRef);
    }
    if (this.editMode) {
      console.log('editMode:' + this.editMode);
      this.responsableService.updateResponsable(this.id, newResponsable);
      this.dataManagementService.storeResponsables();
    } else {

      this.responsableService.addResponsable(newResponsable);
      this.dataManagementService.storeResponsables();

    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
    this.responsableService.prevPicChanged.next('');
  }

  onAddHistoryEl() {
    (<FormArray>this.responsableForm.get('history')).push(
      new FormGroup({
        'description': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteHistoryEl(index: number) {
    (<FormArray>this.responsableForm.get('history')).removeAt(index);
  }

  onAddFunctionEl() {
    (<FormArray>this.responsableForm.get('functions')).push(
      new FormGroup({
        'description': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteFunctionEl(index: number) {
    (<FormArray>this.responsableForm.get('functions')).removeAt(index);
  }

  onDeleteResponsable(id: string){
    this.responsableService.deleteResponsable(id);
    this.dataManagementService.storeResponsables();
    this.onCancel();
  }


  handlePicture(event){
    this.files = event.target.files;
  }

  uploadPicture(){
    const filesToUpload = this.files;
    const filesIdx = _.range(filesToUpload.length);
    _.each(filesIdx, (idx) => {
      this.upload = new Upload(filesToUpload[idx]);
      this.pictureLoaded = false;
      const urlSubject = this.dataManagementService.uploadFile(this.upload, '/responsables_pic');
      urlSubject.subscribe( (url: string) => {
        this.newPictureUrl = url;
        this.pictureLoaded = true;
        this.responsableService.prevPicChanged.next(this.newPictureUrl);
        console.log('The new pictureUrl is ' + this.newPictureUrl);
      } );
    });
    this.pictureUpdated = true;
  }


  private initForm(){
    let firstName = '';
    let lastName = '';
    let pictureURL = '';
    let history = new FormArray([]);
    let functions = new FormArray([]);

    if(this.editMode){
      const responsable = this.responsableService.getResponsable(this.id);
      if (responsable){
        this.responsableService.prevPicChanged.next(
          responsable.pictureRef === '' ? 'NoPicture' : responsable.pictureRef
        )
        firstName = responsable.firstname;
        lastName = responsable.lastname;
        if (responsable['history']) {
          for (let his of responsable.history) {
            history.push(
              new FormGroup({
                'description': new FormControl(his.description, Validators.required)
              })
            );
          }
        }
        if (responsable['functions']) {
          for (let fun of responsable.functions) {
            functions.push(
              new FormGroup({
                'description': new FormControl(fun.description, Validators.required),
              })
            );
          }
        }

      }
    }

    this.responsableForm = new FormGroup({
      'firstname' : new FormControl(firstName, Validators.required),
      'lastname' : new FormControl(lastName, Validators.required),
      'pictureRef': new FormControl(pictureURL),
      'history' : history,
      'functions': functions
    });
  }

}
