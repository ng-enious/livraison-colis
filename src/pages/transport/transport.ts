
import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { AnnonceData } from '../../providers/annonce-data';
import { MesAnnoncesPage } from '../mes-annonces/mes-annonces';


@Component({
    selector: 'page-transport',
    templateUrl: 'transport.html'
})
export class TransportPage {
    annonce: any;
    constructor(public navCtrl: NavController, public annonceData: AnnonceData, public navParams: NavParams) {

        this.annonce = this.navParams.data.annonceE;
        //console.log(this.annonce ); 
    }

    createAnnonce(annonceId: string, annoncetitle: string, annoncetype: string, annonceDesc: string, annonceDate: string,
        adresseDep: string, adresseArr: string) {
        if (!(annonceId)) {
            this.annonceData.createAnnonce(annoncetitle, annonceDate, annoncetype,
                annonceDesc, adresseDep, adresseArr).then(() => {
                this.navCtrl.setRoot(MesAnnoncesPage);

            })
        } else {
            this.annonceData.updateAnnonce(annonceId, annoncetitle, annonceDate, annoncetype,
                annonceDesc, adresseDep, adresseArr).then(() => {
                this.navCtrl.setRoot(MesAnnoncesPage);

            })
        }

    }
}
 


