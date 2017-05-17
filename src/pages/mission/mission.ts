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
    dmdtrajet: any;
    annonceCurentid: any;
    dmdtrajetUser: any;
    demandeDetails: firebase.database.Reference;
    dmdId: any;



    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.dmdtrajet = this.navParams.data.t;
        this.dmdtrajetUser = this.navParams.data.u;
        this.annonceCurentid = this.navParams.data.annonce;
        this.dmdId = this.navParams.data.dmId;
        this.demandeDetails = firebase.database().ref(`annonces/${this.annonceCurentid}/demandes/${this.dmdId}`);
    }



    ionViewDidLoad() {
        console.log('ionViewDidLoad MissionPage');
    }

}
