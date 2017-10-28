import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {NewsComponent} from "./news/news.component";
import {NgModule} from "@angular/core";
import {CompetitorsComponent} from "./competitors/competitors.component";
import {ResultsComponent} from "./results/results.component";
import {InfosComponent} from "./infos/infos.component";
import {CompetitorItemComponent} from "./competitors/competitor-item/competitor-item.component";
import {GalleryComponent} from "./gallery/gallery.component";
import {ImageDetailsComponent} from "./gallery/image-details/image-details.component";
import {ResponsableItemComponent} from "./infos/responsable-item/responsable-item.component";

const appRoutes: Routes = [
  { path: '', redirectTo : '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'news', component: NewsComponent},
  { path: 'competiteurs', component: CompetitorsComponent, children: [
    { path: ':id', component: CompetitorItemComponent}
  ]},
  { path: 'photos', component: GalleryComponent},
  { path: 'image/:id', component: ImageDetailsComponent},
  { path: 'resultats', component: ResultsComponent},
  { path: 'infos', component: InfosComponent, children: [
    {path: ':id', component: ResponsableItemComponent}
  ]},
  { path: 'admin', loadChildren : './admin-section/admin-section.module#AdminSectionModule'}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
