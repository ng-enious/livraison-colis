import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import firebase from 'firebase';
import { AnnonceData } from '../../providers/annonce-data';
import { TransportPage } from '../transport/transport';
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
                            user_id : snap.val().user_id, 
                            title : snap.val().title,
                            date: snap.val().date,
                            description : snap.val().description ,
                            adresse_dep : snap.val().adresse_dep ,
                            adresse_arr : snap.val().adresse_arr ,
                            type_obj : snap.val().type_obj 
                          });
                        return false
                        });
                        this.annonces = rawList;
                      });

    }
   AddNewA(){

      let annonce  = {
    title : '', 
    type_obj : '', 
    description : '', 
    date : '',
    adresse_dep: '' , 
    adresse_arr : ''
      } ; 
            this.navCtrl.push(TransportPage, { 
        annonceE : annonce });
    }

    edit(annonce){
      //console.log(annonce);
      
      this.navCtrl.push(TransportPage, { 
        annonceE : annonce });
   }
   removeA(annonce){
       this.annonceData.deleteAnnonce(annonce);
   }
}

