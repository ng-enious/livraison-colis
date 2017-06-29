import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams , Nav } from 'ionic-angular';

import { Page2  } from '../page2/page2';

import { AboutPage  } from '../about/about';
import { AccueilPage  } from '../accueil/accueil';
import { AuthData } from '../../providers/auth-data';

 import { MesTrajetsPage } from '../mes-trajets/mes-trajets';
import { MesAnnoncesPage } from '../mes-annonces/mes-annonces';


@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild(Nav) nav: Nav;
    tab1Root: any = AccueilPage;
    tab2Root: any = MesAnnoncesPage;
    tab3Root: any = MesTrajetsPage;
    tab4Root: any = Page2;
    tab6Root: any = AboutPage;
    constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData) {}
}