import { Injectable } from '@angular/core';
import firebase from 'firebase';
@Injectable()
export class AnnonceData {
    public currentUser: string;
    public annonceList: firebase.database.Reference;

    constructor() {

        this.currentUser = firebase.auth().currentUser.uid;
        this.annonceList = firebase.database().ref('/annonces');
    }

    getAnnoncesList(): firebase.database.Reference {
        return this.annonceList;
    }

    createAnnonce(annoncetitle: string, annonceDate: string, annoncetype: string,
        description: string, adresseDep: string, adresseArr: string): firebase.Promise < any > {

        return this.annonceList.push({
            user_id: this.currentUser,
            title: annoncetitle,
            date: annonceDate,
            type_obj: annoncetype,
            description: description,
            adresse_dep: adresseDep,
            adresse_arr: adresseArr
        });
    }
    updateAnnonce(annonceId: string, annoncetitle: string, annonceDate: string, annoncetype: string,
        description: string, adresseDep: string, adresseArr: string): firebase.Promise < any > {
        return this.annonceList.child(annonceId).update({
            type_obj: annoncetype,
            description: description,
            title: annoncetitle,
            date: annonceDate,
            adresse_dep: adresseDep,
            adresse_arr: adresseArr
        });
    }

    deleteAnnonce(annonce: any): firebase.Promise < any > {
        return this.annonceList.child(annonce.id).remove();

    }



}