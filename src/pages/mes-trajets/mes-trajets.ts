import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import firebase from 'firebase';
import { TrajetData } from '../../providers/trajet-data';
import { TrajetPage } from '../trajet/trajet';
@Component({
  selector: 'page-mes-trajets',
  templateUrl: 'mes-trajets.html'
})
export class MesTrajetsPage {
  public trajets : any;
  public currentUser: string;


  constructor(public navCtrl: NavController, public trajetData: TrajetData ) {

  }
   ionViewDidEnter(){
    this.currentUser = firebase.auth().currentUser.uid;
    this.trajetData.getTrajetsList()
                    .orderByChild("user_id")
                    .equalTo(this.currentUser)
                    .on('value', snapshot => {
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

       AddNewT(){
      this.navCtrl.push(TrajetPage);
    }


}
