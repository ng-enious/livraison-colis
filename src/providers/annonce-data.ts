import { Injectable } from '@angular/core';
import firebase from 'firebase';
@Injectable()
export class AnnonceData {
  public currentUser: string;
  public annonceList: firebase.database.Reference;
  public profilePictureRef: firebase.storage.Reference;

  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.annonceList = firebase.database().ref(`annonces`);
    this.profilePictureRef = firebase.storage().ref('/guestProfile/');

  }

  getEventList(): firebase.database.Reference {
    return this.annonceList;
  }

  getEventDetail(annonceId): firebase.database.Reference {
    return this.annonceList.child(annonceId);
  }

  createAnnonce(annoncetitle: string, annonceDate: string, annoncetype : string , 
    annonceDesc : string , adresseDep : string , adresseArr: string): firebase.Promise<any> {
    return this.annonceList.push({
      user_id : this.currentUser ,
      title : annoncetitle,
      date: annonceDate ,
      type_obj : annoncetype ,
      annonceDesc : annonceDesc , 
      adresse_dep : adresseDep ,
      adresse_arr : adresseArr
    });
  }

  addGuest(guestName, eventId, eventPrice, guestPicture = null): firebase.Promise<any> {
    return this.annonceList.child(eventId).child('guestList').push({
      guestName: guestName
    }).then((newGuest) => {
      this.annonceList.child(eventId).transaction( (event) => {
        event.revenue += eventPrice;
        return event;
      });
      if (guestPicture != null) {
        this.profilePictureRef.child(newGuest.key).child('profilePicture.png')
      .putString(guestPicture, 'base64', {contentType: 'img/png'})
        .then((savedPicture) => {
          this.annonceList.child(eventId).child('guestList').child(newGuest.key).child('profilePicture')
          .set(savedPicture.downloadURL);
        });        
      }
    });
  }

}
