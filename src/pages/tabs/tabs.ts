import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import {ListeAnnoncesPage } from '../liste-annonces/liste-annonces';
import {ListeTrajetsPage } from '../liste-trajets/liste-trajets';
import { Page2  } from '../page2/page2';
import { StatistiquesPage  } from '../statistiques/statistiques';
import { AboutPage  } from '../about/about';
import { AccueilPage  } from '../accueil/accueil';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = AccueilPage ;
  tab2Root: any = ListeAnnoncesPage ;
  tab3Root: any = ListeTrajetsPage ;
  tab4Root: any = Page2 ;
  tab5Root: any = StatistiquesPage ;
  tab6Root: any = AboutPage ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}




}
