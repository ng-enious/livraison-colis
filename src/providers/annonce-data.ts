import { Injectable } from '@angular/core';
import firebase from 'firebase';
@Injectable()
export class AnnonceData {
  public currentUser: string;
  public annonceList: firebase.database.Reference;
 

  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.annonceList = firebase.database().ref(`annonces`);
  

  }

  getAnnoncesList(): firebase.database.Reference {
    return this.annonceList;
  }

 //getAnnoncesDetail(annoncesId): firebase.database.Reference {
  //  return this.annonceList.child(annoncesId);
 // }

  createAnnonce(annoncetitle: string, annonceDate: string, annoncetype : string , 
  description  : string , adresseDep : string , adresseArr: string): firebase.Promise<any> {
    return this.annonceList.push({
      user_id : this.currentUser ,
      title : annoncetitle,
      date: annonceDate ,
      type_obj : annoncetype ,
      description  : description  , 
      adresse_dep : adresseDep ,
      adresse_arr : adresseArr
    });
  }

 
  

}
