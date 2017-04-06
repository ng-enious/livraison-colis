import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { TransportPage } from '../transport/transport';
import { TrajetPage  } from '../trajet/trajet';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController) {
    
  }
  GoToTransoprtPage(){
    this.navCtrl.push(TransportPage );

  }
  GoToTrajetPage(){
  this.navCtrl.push(TrajetPage );
  }

}
