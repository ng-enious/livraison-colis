import { Component } from '@angular/core';
import { NavController, NavParams  , App } from 'ionic-angular';
import { AnnonceData } from '../../providers/annonce-data';
import { TrajetData } from '../../providers/trajet-data';
import {DemandeData} from '../../providers/demande-data';
//import { AccueilData } from '../../providers/accueil-data';
import firebase from 'firebase';
@Component({
    selector: 'page-accueil',
    templateUrl: 'accueil.html'
})
export class AccueilPage {


    public currentUser: string;
    public demande: firebase.database.Reference;
    public annonce: firebase.database.Reference;

    public annonces: any;
    public trajets: any;
    public trajetsUser: any;
    queryText = '';
    segment: any;


    constructor(public dmd: DemandeData, public app: App, public navCtrl: NavController,
        public navParams: NavParams, public annonceData: AnnonceData, public trajetData: TrajetData) {
        this.currentUser = firebase.auth().currentUser.uid;
        this.annonce = firebase.database().ref('/annonces');
        this.segment = "annonces";
    }


    ionViewDidEnter() {
        this.currentUser = firebase.auth().currentUser.uid;
        this.annonceData.getAnnoncesList().on('value', snapshot => {
            let rawList = [];
            snapshot.forEach(snap => {
                if (this.currentUser != snap.val().user_id) {
                    rawList.push({
                        id: snap.key,
                        user_id: snap.val().user_id,
                        title: snap.val().title,
                        date: snap.val().date,
                        description: snap.val().description,
                        adresse_dep: snap.val().adresse_dep,
                        adresse_arr: snap.val().adresse_arr,
                        type_obj: snap.val().type_obj
                    });
                    return false
                }
            });
            this.annonces = rawList;
        });



        this.trajetData.getTrajetsList().on('value', snapshot => {
            let rawList = [];
            snapshot.forEach(snap => {
                    if (this.currentUser != snap.val().user_id) {
                        rawList.push({
                            id: snap.key,
                            user_id: snap.val().user_id,
                            title: snap.val().title,
                            days: snap.val().days,
                            price: snap.val().price,
                            adresse_dep: snap.val().adresse_dep,
                            adresse_arr: snap.val().adresse_arr,
                        });
                        return false
                    }
                }

            );
            this.trajets = rawList;
        });


        this.trajetData.getTrajetsList()
            .orderByChild("user_id")
            .equalTo(this.currentUser)
            .on('value', snapshot => {
                let rawList = [];
                snapshot.forEach(snap => {
                    rawList.push({
                        id: snap.key,
                        user_id: snap.val().user_id,
                        title: snap.val().title,
                        days: snap.val().days,
                        price: snap.val().price,
                        adresse_dep: snap.val().adresse_dep,
                        adresse_arr: snap.val().adresse_arr,
                    });
                    return false
                });
                this.trajetsUser = rawList;
            });

    }
    envoieDemande(annonce) {
        for (let trajet of this.trajetsUser) {
            if ((annonce.adresse_dep === trajet.adresse_dep) && (annonce.adresse_arr === trajet.adresse_arr)) {
                this.ajoutDemande(trajet.id, annonce.id);



            }
        }
    }


    ajoutDemande(trajetId, annonceId): firebase.Promise < any > {
        return this.annonce.child(annonceId).child('/demandes').push({
            trajet_id: trajetId,
            user_id: this.currentUser
        });;

    }


}