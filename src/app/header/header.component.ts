import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: Observable<firebase.User>

  constructor(private authService: AuthenticationService, private route: Router) { }

  ngOnInit() {
    this.user = this.authService.authUser();
  }

  onLogout(){
    this.authService.logout();
  }

}
