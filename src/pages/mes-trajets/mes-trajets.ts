import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { TrajetData } from '../../providers/trajet-data';
/*
  Generated class for the MesTrajets page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mes-trajets',
  templateUrl: 'mes-trajets.html'
})
export class MesTrajetsPage {
  public trajets : any;

  constructor(public navCtrl: NavController, public trajetData: TrajetData ) {

  }

  ionViewDidEnter(){
    this.trajetData.getTrajetsList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          title : snap.val().title,
          days: snap.val().days,
          price : snap.val().price ,
          adresse_dep : snap.val().adresse_dep ,
           adresse_arr : snap.val().adresse_arr ,
        });
      return false
      });
      this.trajets = rawList;
    });
  }
 /* goToAnnonceDetail(annonceId){
  this.navCtrl.push(AnnonceDetailPage , { annonceId: annonceId });
  }*/

}
