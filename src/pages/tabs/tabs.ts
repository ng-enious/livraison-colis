import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import {LoginPage} from  '../login/login';
//import { Nav} from 'ionic-angular';
import { Page2  } from '../page2/page2';
import { StatistiquesPage  } from '../statistiques/statistiques';
import { AboutPage  } from '../about/about';
import { AccueilPage  } from '../accueil/accueil';
import { AuthData } from '../../providers/auth-data';
// import { TrajetPage } from '../pages/trajet/trajet';
//  import { TransportPage } from '../pages/transport/transport';
 import { MesTrajetsPage } from '../mes-trajets/mes-trajets';
import { MesAnnoncesPage } from '../mes-annonces/mes-annonces';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = AccueilPage ;
  tab2Root: any = MesAnnoncesPage;
  tab3Root: any = MesTrajetsPage ;
  tab4Root: any = Page2 ;
  tab5Root: any = StatistiquesPage ;
  tab6Root: any = AboutPage ;

pages: Array<{title: string, component: any  }>;


  constructor( public navCtrl: NavController, public navParams: NavParams ,public authData : AuthData ) {
     this.pages = [
     { title: 'Accueil', component: this.tab1Root  },
      { title: 'Liste de mes trajets ', component:  this.tab2Root  } ,
      { title: 'Liste de mes annonces', component: this.tab3Root } ,
       { title: 'Ajouter un trajet ', component: this.tab4Root } ,
      { title: 'Ajouter une annonce  ', component:  this.tab5Root } ,
      { title: 'Settings ', component: this.tab6Root  } ,

    ];
  }

  openPage(page) {
   this.navCtrl.setRoot(page.component) ; 
 }



}
