import { Injectable } from '@angular/core';
import firebase from 'firebase';
@Injectable()
export class DemandeData {
    public currentUser: string;
    public demandeList: firebase.database.Reference;



    constructor() {
        this.currentUser = firebase.auth().currentUser.uid;

        this.demandeList = firebase.database().ref('/annonces');
    }

    getDemandesList(): firebase.database.Reference {
        return this.demandeList;
    }
}
