import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams , Nav } from 'ionic-angular';
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
  @ViewChild(Nav) nav: Nav;
  tab1Root: any = AccueilPage ;
  tab2Root: any = MesAnnoncesPage;
  tab3Root: any = MesTrajetsPage ;
  tab4Root: any = Page2 ;
  tab5Root: any = StatistiquesPage ;
  tab6Root: any = AboutPage ;
//   mySelectedIndex: number;
// pages: Array<{title: string, component: any , index: number }>;


  constructor( public navCtrl: NavController, public navParams: NavParams ,public authData : AuthData ) {
    //   this.mySelectedIndex = navParams.data.tabIndex || 0;

    //  this.pages = [
    //  { title: 'Accueil', component: AccueilPage , index : 0 },
    //   { title: 'Liste de mes trajets ', component: MesAnnoncesPage  , index : 1 } ,
    //   { title: 'Liste de mes annonces', component:  MesTrajetsPage , index : 2 } ,
    //    { title: 'Ajouter un trajet ', component: Page2 , index : 3 } ,
    //   { title: 'Ajouter une annonce  ', component:  StatistiquesPage  , index : 4 } ,
    //   { title: 'Settings ', component: AboutPage , index : 5 } ,

    // ];

 
  }
 

// openPage(page ) {

//         let params = {};
//         if (page.index) {
//         params = { tabIndex: page.index };
//          this.nav.setRoot(page.component) ; 
//         }
//         if (this.nav.getActiveChildNav() && page.index != undefined) {
//         this.nav.getActiveChildNav().select(page.index);
//         // Set the root of the nav with params if it's a tab index
//         } else {
//         this.nav.setRoot(page.name , params).catch((err: any) => {
//         console.log(`Didn't set nav root: ${err}`);
//         });
//}

 // }



}
