import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../authentication.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMsg: string;
  user: Observable<firebase.User>


  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(
      (user: firebase.User) => {
        if (user){
          this.router.navigate(['../gestion-competiteurs'], {relativeTo: this.route});
        }
      }
    );
  }

  signIn() {
    console.log('Try to signIn...');
    this.authService.login({ email: this.email, password: this.password })
      .then(resolve => {
        console.log('Signed in !');
        this.router.navigate(['../gestion-competiteurs'], {relativeTo: this.route});
      })
      .catch(error => this.errorMsg = 'Veuillez entrer un identifiant et un mot de passe valide');
  }

}
