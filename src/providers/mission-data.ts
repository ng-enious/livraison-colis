import { Injectable } from '@angular/core';
import firebase from 'firebase';
@Injectable()
export class MissionData {
    public currentUser: string;
    public trajetList: firebase.database.Reference;


    constructor() {}
    createTrajet(trajetTitle: string, adDep: string, adArr: string, date: string,
        prix: string): firebase.Promise < any > {
        return this.trajetList.push({
            user_id: this.currentUser,
            title: trajetTitle,
            adresse_dep: adDep,
            adresse_arr: adArr,
            days: date,
            price: prix
        });
    }
}
