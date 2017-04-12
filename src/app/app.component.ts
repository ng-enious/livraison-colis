import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from  '../pages/login/login';
import {AuthData} from  '../providers/auth-data';
import { TabsPage } from '../pages/tabs/tabs';


//import { Page2 } from '../pages/page2/page2';
import { TrajetPage } from '../pages/trajet/trajet';
import { TransportPage } from '../pages/transport/transport';
import { MesTrajetsPage } from '../pages/mes-trajets/mes-trajets';
import { MesAnnoncesPage } from '../pages/mes-annonces/mes-annonces';
import { StatistiquesPage } from '../pages/statistiques/statistiques';

import { AngularFire } from 'angularfire2';
import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage: any  ;
  fireAuth: any;

  pages: Array<{title: string, component: any  }>;

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
    
    this.initializeApp();


    // used for an example of ngFor and navigation
    this.pages = [
     { title: 'Accueil', component: TabsPage  },
      { title: 'Liste de mes trajets ', component:  MesTrajetsPage   } ,
      { title: 'Liste de mes annonces', component: MesAnnoncesPage  } ,
       { title: 'Ajouter un trajet ', component:  TrajetPage  } ,
      { title: 'Ajouter une annonce  ', component:  TransportPage } ,
      { title: 'Settings ', component:  StatistiquesPage   } ,

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {


  this.nav.setRoot(page.component) ; 
}
 logoutApp(){
  
   this.logoutUser().then(() => {
      this.nav.setRoot(LoginPage)} );

  }

 logoutUser(): firebase.Promise<any> {
  return this.af.auth.logout();
 }

}
