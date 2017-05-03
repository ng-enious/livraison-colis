import { Component , ViewChild} from '@angular/core';
import { NavController, NavParams , List , App } from 'ionic-angular';
import { AnnonceData } from '../../providers/annonce-data';
import { TrajetData } from '../../providers/trajet-data';
//import { AccueilData } from '../../providers/accueil-data';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {
    public annonces : any;
      public trajets : any;


 
  queryText = '';


  constructor( public app: App, public navCtrl: NavController, public navParams: NavParams , public annonceData: AnnonceData , public trajetData: TrajetData ) {}

  ionViewDidEnter(){
    this.annonceData.getAnnoncesList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
        //  id: snap.key,
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


        this.trajetData.getTrajetsList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
        //  id: snap.key,
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





}
