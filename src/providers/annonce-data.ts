import { Injectable } from '@angular/core';
import firebase from 'firebase';
@Injectable()
export class AnnonceData {
  public currentUser: string;
  public annonce : string;
  public annonceList: firebase.database.Reference;

  constructor() {
    this.annonce = 
    this.currentUser = firebase.auth().currentUser.uid;
     this.annonceList = firebase.database().ref("annonces");   
  }

  getAnnoncesList(): firebase.database.Reference {  
    return this.annonceList;
  }
 createAnnonce(id_annonce : string ,  annoncetitle: string , annonceDate: string, annoncetype : string , 
  description  : string , adresseDep : string , adresseArr: string): firebase.Promise<any> {

    return this.annonceList.push({
      user_id : this.currentUser ,
      title : annoncetitle ,
      date: annonceDate ,
      type_obj : annoncetype ,
      description  : description  , 
      adresse_dep : adresseDep ,
      adresse_arr : adresseArr
    });
  }

 

}
