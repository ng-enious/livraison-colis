import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { AnnonceData } from '../../providers/annonce-data';
@Component({
  selector: 'page-mes-annonces',
  templateUrl: 'mes-annonces.html'
})
export class MesAnnoncesPage {

  public annonces : any;

  constructor(public navCtrl: NavController, public annonceData: AnnonceData ) {

  }

  ionViewDidEnter(){
    this.annonceData.getAnnoncesList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          title : snap.val().title,
          date: snap.val().date,
          description : snap.val().description ,
          adresse_dep : snap.val().adresse_dep ,
           adresse_arr : snap.val().adresse_arr ,
        });
      return false
      });
      this.annonces = rawList;
    });
  }
 /* goToAnnonceDetail(annonceId){
  this.navCtrl.push(AnnonceDetailPage , { annonceId: annonceId });
  }*/

}

