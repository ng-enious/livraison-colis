import { Component,NgZone } from '@angular/core';
import { NavController,ModalController} from 'ionic-angular';
import { TrajetData } from '../../providers/trajet-data';
import { TabsPage } from '../tabs/tabs';
//import {AutocompletePage} from '../autocomplete/autocomplete';
import {ViewController} from 'ionic-angular';
declare var google;
@Component({
  selector: 'page-trajet',
  templateUrl: 'trajet.html'
})
export class TrajetPage {
   autocompleteItems;
  autocomplete;
  address;
    
     service = new google.maps.places.AutocompleteService();
 constructor(public navCtrl: NavController, public trajetData: TrajetData,private modalCtrl: ModalController, private zone: NgZone,public viewCtrl: ViewController) {
 
     this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
 }

  createTrajet(trajetTitle: string,   adDep : string , adArr: string ,  date: string , 
     prix : number ){
    this.trajetData.createTrajet(trajetTitle,  adDep , adArr   ,date , prix ).then( () => {
      this.navCtrl.push(TabsPage);
    });
  }
 
 
  
 
  dismiss() {
    this.viewCtrl.dismiss();
  }
 
  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'TH'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }


}
