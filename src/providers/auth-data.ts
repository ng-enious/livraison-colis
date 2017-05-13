import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Platform } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
@Injectable()
export class AuthData {
fireAuth: any;
 HAS_LOGGED_IN = 'hasLoggedIn';
  constructor(public http: Http ,public  af: AngularFire , private platform: Platform) {
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
      password : newPassword
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
        email: email ,
        password : password,
        provider : 'email'
      });
    });
  }

 loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        Facebook.login(['public_profile', 'email']).then(facebookData => {
          let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
          firebase.auth().signInWithCredential(provider).then(firebaseData => {
            this.af.database.list('users').update(firebaseData.uid, {
              fullname: firebaseData.displayName,
              email: firebaseData.email,
              provider: 'facebook',
              avatar : firebaseData.photoURL
            });
            observer.next();
          });
        }, error => {
          observer.error(error);
        });
      } else {
        this.af.auth.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Popup
        }).then((facebookData) => {
          this.af.database.list('users').update(facebookData.auth.uid, {
            username : facebookData.auth.displayName, 
            fullname: facebookData.auth.displayName,
            email: facebookData.auth.email,
            provider: 'facebook',
            avatar: facebookData.auth.photoURL
          });
          observer.next();
        }).catch((error) => {
          console.info("error", error);
          observer.error(error);
        });
      }
    });
  }

  // hasLoggedIn(): Promise<boolean> {
  //   return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
  //     return value === true;
  //   });
  // };


}
