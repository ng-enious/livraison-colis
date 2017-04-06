import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import firebase from 'firebase';


@Injectable()
export class AuthData {
fireAuth: any;
  constructor(public http: Http ,public  af: AngularFire) {
    af.auth.subscribe( user => {
            if (user) {
                this.fireAuth = user.auth;
                console.log(user);
            }
        });
  
  }

 loginUser( newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.af.auth.login({
      email: newEmail,
      password: newPassword
    });
  }

  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return this.af.auth.logout();
  }

  signupUser( email: string, password: string ): firebase.Promise<any> {


     return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
      firebase.database().ref('/users').child(newUser.uid).set({
        email: email
      });
    });
  }

 




}
