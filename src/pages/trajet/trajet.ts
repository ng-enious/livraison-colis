
import { Component  } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { TrajetData } from '../../providers/trajet-data';
import { MesTrajetsPage } from '../mes-trajets/mes-trajets';

@Component({
    selector: 'page-trajet',
    templateUrl: 'trajet.html'
})
export class TrajetPage {
    trajet: any;
    constructor(public navCtrl: NavController, public trajetData: TrajetData, public navParams: NavParams) {

        this.trajet = this.navParams.data.trajetE;
        console.log(this.trajet);
    }

    createTrajet(trajetId: string, trajetTitle: string, adDep: string, adArr: string, date: string, price: string) {

        if (!(trajetId)) {
            this.trajetData.createTrajet(trajetTitle, adDep, adArr, date, price).then(() => {
                this.navCtrl.setRoot(MesTrajetsPage);
            })
        } else {

            this.trajetData.updateTrajet(this.trajet.id, trajetTitle, adDep, adArr, date, price).then(() => {
                this.navCtrl.setRoot(MesTrajetsPage);

            })
        }

    }
}
 



