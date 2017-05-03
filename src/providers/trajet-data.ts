import { Injectable } from '@angular/core';
import firebase from 'firebase';
@Injectable()
export class TrajetData {
  public currentUser: string;
  public trajetList: firebase.database.Reference;


  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.trajetList = firebase.database().ref('/trajets');
     }


     
  getTrajetsList(): firebase.database.Reference {
    return this.trajetList;
  }

  createTrajet(trajetTitle: string ,  adDep : string , adArr: string ,  date: string , 
     prix : string): firebase.Promise<any> {
    return this.trajetList.push({
      user_id : this.currentUser ,
      title : trajetTitle ,
      adresse_dep : adDep  ,
      adresse_arr  :  adArr ,
      days : date , 
      price : prix 
    });
  }

 updateTrajet( trajetId : string , trajetTitle: string ,  adDep : string , adArr: string ,  date: string , 
     price : string): firebase.Promise<any> {
     return this.trajetList.child(trajetId).update( {
           title : trajetTitle ,
      adresse_dep : adDep  ,
      adresse_arr  :  adArr ,
      days : date , 
      price : price
     }) ;
   }

 deleteTrajet(trajet : any ): firebase.Promise<any>  {
     return this.trajetList.child(trajet.id).remove();

   }

}
