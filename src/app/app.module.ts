import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';
import {LoginPage} from  '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { TransportPage } from '../pages/transport/transport';
import { TrajetPage } from '../pages/trajet/trajet';
import { TabsPage } from '../pages/tabs/tabs';


import { StatistiquesPage  } from '../pages/statistiques/statistiques';
import { AboutPage  } from '../pages/about/about';
import { MesTrajetsPage } from '../pages/mes-trajets/mes-trajets';
import { MesAnnoncesPage } from '../pages/mes-annonces/mes-annonces';
import {ListeTrajetsPage } from '../pages/liste-trajets/liste-trajets';

import { ListeAnnoncesPage } from '../pages/liste-annonces/liste-annonces';


// Importing Providers
import { AuthData } from '../providers/auth-data';
import { AnnonceData} from '../providers/annonce-data';
import { TrajetData} from '../providers/trajet-data';
import { ProfileData} from '../providers/profile-data';

// Importing AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyDl_nFBC5PtkK9lL3kXWEHjrpXKognt_Gc",
    authDomain: "livraison-colis.firebaseapp.com",
    databaseURL: "https://livraison-colis.firebaseio.com",
    projectId: "livraison-colis",
    storageBucket: "livraison-colis.appspot.com",
    messagingSenderId: "656985297982"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
 
    Page2,
    LoginPage,
    ResetPasswordPage,
    SignupPage ,
    TransportPage ,
    TrajetPage ,
    StatistiquesPage ,
    AboutPage ,
     MesTrajetsPage  ,
      MesAnnoncesPage ,
      TabsPage,
      ListeTrajetsPage ,
      ListeAnnoncesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   
    Page2,
    LoginPage ,
     ResetPasswordPage,
    SignupPage ,
    TransportPage ,
    TrajetPage ,
    StatistiquesPage ,
    AboutPage ,
    MesTrajetsPage  ,
    MesAnnoncesPage ,
    TabsPage ,
    ListeTrajetsPage ,
    ListeAnnoncesPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData , AnnonceData , TrajetData , ProfileData 
  ]
})
export class AppModule {}
