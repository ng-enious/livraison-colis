import { Component , Output ,  EventEmitter } from '@angular/core';
import { NavController} from 'ionic-angular';
import firebase from 'firebase';
import { AnnonceData } from '../../providers/annonce-data';
import { TransportPage } from '../transport/transport';
@Component({
  selector: 'page-mes-annonces',
  templateUrl: 'mes-annonces.html'
})
export class MesAnnoncesPage {
  @Output() remove = new EventEmitter(false);

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
                          });
                        return false
                        });
                        this.annonces = rawList;
                      });

    }
    AddNewA(){
      this.navCtrl.push(TransportPage);
    }

    edit(annonce){
      console.log(annonce.id);
     //  this.navCtrl.push(TransportPage);
       

    // this.navCtrl.push(TransportPage , {
    //   key: contact.$key,
    //   name: contact.name,
    //   address: contact.address,
    //   phone: contact.phone,
    //   city: contact.city
    // });
  }

  // deleteContact(contact) {
  //   this.contactList.remove(contact);
  // }
}

