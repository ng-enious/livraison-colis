import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { TrajetData } from '../../providers/trajet-data';

@Component({
  selector: 'page-trajet',
  templateUrl: 'trajet.html'
})
export class TrajetPage {

 constructor(public navCtrl: NavController, public trajetData: TrajetData) {}

  createTrajet(trajetTitle: string,   adDep : string , adArr: string ,  date: string , 
     prix : number ){
    this.trajetData.createTrajet(trajetTitle,  adDep , adArr   ,date , prix ).then( () => {
      this.navCtrl.pop();
    });
  }
 



}
