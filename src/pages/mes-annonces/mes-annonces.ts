import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import firebase from 'firebase';
import { AnnonceData } from '../../providers/annonce-data';
@Component({
  selector: 'page-mes-annonces',
  templateUrl: 'mes-annonces.html'
})
export class MesAnnoncesPage {

  public annonces : any;
  public currentUser: string;

  constructor(public navCtrl: NavController, public annonceData: AnnonceData ) {

  }

  ionViewDidEnter(){
    this.currentUser = firebase.auth().currentUser.uid;
    this.annonceData.getAnnoncesList()
                    .orderByChild("user_id")
                    .equalTo(this.currentUser)
                    .on('value', snapshot => {
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
}

