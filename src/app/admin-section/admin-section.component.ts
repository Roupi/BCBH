import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss']
})
export class AdminSectionComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  onLogout(){
    this.authenticationService.logout();
    this.router.navigate(['/'])
  }

  ngOnInit() {
  }

}
