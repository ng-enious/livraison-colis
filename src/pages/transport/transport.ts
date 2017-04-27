
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AnnonceData } from '../../providers/annonce-data';
import { MesAnnoncesPage } from '../mes-annonces/mes-annonces';
/*
  Generated class for the Transport page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transport',
  templateUrl: 'transport.html'
})
export class TransportPage {

 constructor(public navCtrl: NavController, public annonceData: AnnonceData) {}

  createAnnonce(id_annonce :string  ,annoncetitle: string, annoncetype : string,  annonceDesc : string ,  annonceDate: string , 
    adresseDep : string , adresseArr: string) {
    this.annonceData.createAnnonce( id_annonce ,  annoncetitle, annonceDate, annoncetype , 
    annonceDesc, adresseDep, adresseArr).then( () => {
    this.navCtrl.setRoot(MesAnnoncesPage);
    });
  }
 

}
