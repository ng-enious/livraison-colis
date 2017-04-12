import { Injectable } from '@angular/core';
import firebase from 'firebase';
@Injectable()
export class TrajetData {
  public currentUser: string;
  public trajetList: firebase.database.Reference;


  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.trajetList = firebase.database().ref(`trajets`);
    

  }




  getTrajetsList(): firebase.database.Reference {
    return this.trajetList;
  }


  createTrajet(trajetTitle: string ,  adDep : string , adArr: string ,  date: string , 
     prix : number): firebase.Promise<any> {
    return this.trajetList.push({
      user_id : this.currentUser ,
      title : trajetTitle ,
      adresse_dep : adDep  ,
      adresse_arr  :  adArr ,
      days : date , 
      price : prix 
    });
  }}
