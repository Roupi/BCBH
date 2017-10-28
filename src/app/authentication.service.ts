import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "./user.model";
import * as firebase from 'firebase';

@Injectable()
export class AuthenticationService {

  private user: Observable<firebase.User>;
  token: string;
  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  authUser() {
    return this.user;
  }
}
