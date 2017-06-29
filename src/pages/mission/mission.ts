import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the Mission page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mission',
  templateUrl: 'mission.html'
})
export class MissionPage {
  demande : any ;
  annonce :  firebase.database.Reference ;
  dmdId : any ; 



  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.demande = this.navParams.data.demande;
     firebase.database().ref(`annonces/${this.demande.annonceId}`).on('value', (item: any) => {
         this.annonce = item.val();
      }, (error) => {
          console.log(error);
      });
  }
  
  ionViewDidLoad() {
  }

}
