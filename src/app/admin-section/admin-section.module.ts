
import {NgModule} from "@angular/core";
import {ComptetitorsManagementComponent} from "./comptetitors-management/comptetitors-management.component";
import {NewsManagementComponent} from "./news-management/news-management.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AdminSectionRoutingModule} from "./admin-section-routing.module";
import {AdminSectionComponent} from "./admin-section.component";
import { CompetitorEditComponent } from './comptetitors-management/competitor-edit/competitor-edit.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "../authentication.service";
import {AuthenticationGuard} from "../authentification-guard.service";
import { GalleryManagementComponent } from './gallery-management/gallery-management.component';
import { ResponsablesManagementComponent } from './responsables-management/responsables-management.component';
import { ResponsableEditComponent } from './responsables-management/responsable-edit/responsable-edit.component';
import { NewsEditComponent } from './news-management/news-edit/news-edit.component';

@NgModule({
  declarations: [
    AdminSectionComponent,
    ComptetitorsManagementComponent,
    NewsManagementComponent,
    CompetitorEditComponent,
    LoginComponent,
    GalleryManagementComponent,
    ResponsablesManagementComponent,
    ResponsableEditComponent,
    NewsEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminSectionRoutingModule
  ],
  providers: [
    AuthenticationGuard
  ]
})
export class AdminSectionModule{}
