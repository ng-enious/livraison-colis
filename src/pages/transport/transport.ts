import { Component , NgZone } from '@angular/core';
import { NavController , ModalController} from 'ionic-angular';
import { AnnonceData } from '../../providers/annonce-data';
import { TabsPage} from '../tabs/tabs';
import {ViewController} from 'ionic-angular';


declare var google:any;
@Component({
  selector: 'page-transport',
  templateUrl: 'transport.html'
})
export class TransportPage {


 /* address:any = {
        place: '',
        set: false,
    };
    placesService:any;
    map: any;
    markers = [];
    placedetails: any; 

 //address;*/

  autocompleteItems;
   autocompleteItems1;
  autocompletearr;
  autocompletedep;
  
  service = new google.maps.places.AutocompleteService();
 
 constructor(public viewCtrl: ViewController, public navCtrl: NavController, public annonceData: AnnonceData , private modalCtrl: ModalController , private zone: NgZone) {
   this.autocompleteItems = [];
    this.autocompleteItems1 = [];
    this.autocompletearr= {
      query: ''
    }; 
     this.autocompletedep= {
      query: ''
    }; 
 }

  createAnnonce(annoncetitle: string, annoncetype : string,    description : string ,  annonceDate: string , 
    adresseDep : string , adresseArr: string) {
    this.annonceData.createAnnonce(annoncetitle, annonceDate, annoncetype , 
    description , adresseDep, adresseArr).then( () => {
      this.navCtrl.push(TabsPage);
    });
  }
/* showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    modal.present();
  }*/



  dismiss() {
    this.viewCtrl.dismiss();
  }
 
  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocompletearr.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocompletearr.query, componentRestrictions: {country: 'TH'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }

  updateSearch1() {
    if (this.autocompletedep.query == '') {
      this.autocompleteItems1 = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocompletedep.query, componentRestrictions: {country: 'TH'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems1.push(prediction.description);
        });
      });
    });
  }

  
}

