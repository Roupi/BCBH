import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminSectionComponent} from "./admin-section.component";
import {ComptetitorsManagementComponent} from "./comptetitors-management/comptetitors-management.component";
import {NewsManagementComponent} from "./news-management/news-management.component";
import {CompetitorEditComponent} from "./comptetitors-management/competitor-edit/competitor-edit.component";
import {LoginComponent} from "./login/login.component";
import {GalleryManagementComponent} from "./gallery-management/gallery-management.component";
import {ResponsablesManagementComponent} from "./responsables-management/responsables-management.component";
import {ResponsableEditComponent} from "./responsables-management/responsable-edit/responsable-edit.component";
import {NewsEditComponent} from "./news-management/news-edit/news-edit.component";
import {AuthenticationGuard} from "../authentification-guard.service";

const appRoutes: Routes = [
  { path: '', component: AdminSectionComponent, children: [
    { path: '', redirectTo: 'login', pathMatch:'full'},
    { path: 'gestion-competiteurs', component: ComptetitorsManagementComponent, children: [
      { path: ':id', component: CompetitorEditComponent}
    ], canActivate: [AuthenticationGuard]},
    { path: 'gestion-news', component: NewsManagementComponent, children: [
      { path: ':id', component: NewsEditComponent}
    ], canActivate: [AuthenticationGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'gestion-photos', component: GalleryManagementComponent, canActivate: [AuthenticationGuard]},
    { path: 'gestion-responsables', component: ResponsablesManagementComponent, children: [
      {path: ':id', component: ResponsableEditComponent}
    ], canActivate: [AuthenticationGuard]},
  ]},
];


@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AdminSectionRoutingModule {}
