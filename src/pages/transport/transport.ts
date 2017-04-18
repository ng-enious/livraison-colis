import { Component , NgZone } from '@angular/core';
import { NavController , ModalController, ToastController} from 'ionic-angular';
import { AnnonceData } from '../../providers/annonce-data';
import { TabsPage} from '../tabs/tabs';
import {ViewController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import { Diagnostic } from 'ionic-native';
import { Toast } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { CameraPreview, CameraPreviewRect } from 'ionic-native';
declare var google:any;
import { File } from 'ionic-native';
declare var cordova: any; // global variable for paths

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
 public base64Image: string;
  autocompleteItems;
   autocompleteItems1;
  autocompletearr;
  autocompletedep;
  
  service = new google.maps.places.AutocompleteService();
 
 constructor(public viewCtrl: ViewController,private platform: Platform,public toastCtrl: ToastController, public navCtrl: NavController, public annonceData: AnnonceData , private modalCtrl: ModalController , private zone: NgZone) {

 this.checkPermissions();
   this.autocompleteItems = [];
    this.autocompleteItems1 = [];
    this.autocompletearr= {
      query: ''
    }; 
     this.autocompletedep= {
      query: ''
    }; 
 }
 checkPermissions() {
  Diagnostic.isCameraAuthorized().then((authorized) => {
    if(authorized)
        this.initializePreview();
    else {
        Diagnostic.requestCameraAuthorization().then((status) => {
            if(status == Diagnostic.permissionStatus.GRANTED)
                this.initializePreview();
            else {
                // Permissions not granted
                // Therefore, create and present toast
                this.toastCtrl.create(
                    {
                        message: "Cannot access camera", 
                        position: "bottom",
                        duration: 5000
                    }
                ).present();
            }
        });
    }
});
}
initializePreview() {
    // Make the width and height of the preview equal 
    // to the width and height of the app's window
    let previewRect: CameraPreviewRect = {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
 CameraPreview.startCamera(
    previewRect, 
    'rear', 
    false, 
    false, 
    true,
    1
);
CameraPreview.setOnPictureTakenHandler().subscribe((result) => {
    this.moveFileToExternalStorage(result[0]); // Move picture only
});
  
}
moveFileToExternalStorage(fileName: string) {
    // Determine paths
    let externalStoragePath: string = 
                cordova.file.externalApplicationStorageDirectory;
    let currentPath: string = 
                cordova.file.applicationStorageDirectory + "files/";
 
    // Extract filename
    fileName = fileName.split("/").pop();
 
    // Move the file
    File.moveFile(currentPath, fileName,
                  externalStoragePath, fileName).then(_ => {
        this.toastCtrl.create(
            {
                message: "Saved one photo", 
                position: "bottom",
                duration: 2000
            }
        ).present();
    });
}

takePicture() {
    CameraPreview.takePicture({maxWidth: 320, maxHeight: 320});
}

changeEffect() {
    // Create an array with 5 effects
    let effects: any = ['none', 'negative','mono', 'aqua', 'sepia'];
 
    let randomEffect: string = effects[Math.floor(
                                Math.random() * effects.length)];
    CameraPreview.setColorEffect(randomEffect);
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
    this.service.getPlacePredictions({ input: this.autocompletearr.query, componentRestrictions: {country: 'th'} }, function (predictions, status) {
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
    this.service.getPlacePredictions({ input: this.autocompletedep.query, componentRestrictions: {country: 'uk'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems1.push(prediction.description);
        });
      });
    });
  }

  
}
