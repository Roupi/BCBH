import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { CompetitorsComponent } from './competitors/competitors.component';
import { CompetitorItemComponent } from './competitors/competitor-item/competitor-item.component';
import { InfosComponent } from './infos/infos.component';
import { ResponsableItemComponent } from './infos/responsable-item/responsable-item.component';
import { ResultsComponent } from './results/results.component';
import {AppRoutingModule} from "./app-routing.module";
import {CompetitorsService} from "./competitors/competitors.service";
import {CommonModule} from "@angular/common";
import { OrderPipe } from './order.pipe';
import {DataManagementService} from "./data-management.service";
import {HttpModule} from "@angular/http";
import { GalleryComponent } from './gallery/gallery.component';
import {ImageDetailsComponent} from "./gallery/image-details/image-details.component";
import {ImageService} from "./image.service";
import {AngularFireDatabaseModule} from "angularfire2/database"
import {AngularFireModule} from "angularfire2"
import {environment} from "../environments/environment"
import {AngularFireAuthModule} from "angularfire2/auth";
import {ResponsableService} from "./infos/responsable.service";
import {NewsService} from "./news/new-service";
import {AuthenticationService} from "./authentication.service";
import {AuthenticationGuard} from "./authentification-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NewsComponent,
    CompetitorsComponent,
    CompetitorItemComponent,
    InfosComponent,
    ResponsableItemComponent,
    ResultsComponent,
    OrderPipe,
    ImageDetailsComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    CompetitorsService,
    ResponsableService,
    NewsService,
    DataManagementService,
    ImageService,
    AuthenticationService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
