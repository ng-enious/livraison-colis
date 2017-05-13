import { Component, ViewChild  } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from  '../pages/login/login';
import {AuthData} from  '../providers/auth-data';
import { TabsPage } from '../pages/tabs/tabs';



import { AngularFire } from 'angularfire2';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage: any  ;
  fireAuth: any;


  constructor(public platform: Platform ,public af: AngularFire ,
  public statusBar: StatusBar, public splashScreen: SplashScreen , public authData : AuthData) {


   

     af.auth.subscribe( user => {
            if (user) {
                this.fireAuth = user.auth;
                console.log(user);
            }
        });

     const authObserver = af.auth.subscribe( user => {
     
      if (user) {
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
   });
    
  



  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


 
}
