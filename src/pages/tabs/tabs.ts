import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import {ListeAnnoncesPage } from '../liste-annonces/liste-annonces';
import {ListeTrajetsPage } from '../liste-trajets/liste-trajets';
import { Page2  } from '../page2/page2';
import { StatistiquesPage  } from '../statistiques/statistiques';
import { AboutPage  } from '../about/about';

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
   tab1Root: any = ListeAnnoncesPage ;
  tab2Root: any = ListeTrajetsPage ;
  tab3Root: any = Page2 ;
  tab4Root: any = StatistiquesPage ;
  tab5Root: any = AboutPage ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
 // goToHome(){
  //  this.navCtrl.push(Page1);  }



}
