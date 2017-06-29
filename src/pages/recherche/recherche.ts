import { Component } from '@angular/core';
import { NavController, NavParams  , App } from 'ionic-angular';
import { AnnonceData } from '../../providers/annonce-data';
import firebase from 'firebase';

@Component({
    selector: 'page-recherche',
    templateUrl: 'recherche.html'
})
export class RecherchePage {
    public annonceRef: any;
    public annonceList: any;
    public loadedAnnonceList: any;
    public variable = false;
    constructor(public app: App, public navCtrl: NavController, public annonceData: AnnonceData, public navParams: NavParams) {
        this.annonceRef = firebase.database().ref('/annonces');
        this.annonceRef.on('value', annonceList => {
            let annonces = [];
            annonceList.forEach(snap=> {
                annonces.push({
                    id: snap.key,
                        user_id: snap.val().user_id,
                        title: snap.val().title,
                        date: snap.val().date,
                        description: snap.val().description,
                        adresse_dep: snap.val().adresse_dep,
                        adresse_arr: snap.val().adresse_arr,
                        type_obj: snap.val().type_obj
                });
            });

            this.annonceList = annonces;
            this.loadedAnnonceList = annonces;
        });


    }

    initializeAnnonceItems(): void {
        this.annonceList = this.loadedAnnonceList;
    }

    getItemsAnnonce(searchbar) {

        this.initializeAnnonceItems();

        var q = searchbar.srcElement.value;

        if (!q) {
            return;

        }

        this.annonceList = this.annonceList.filter((v) => {
            if (v.title && q) {
                if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {

                    return true;

                }
                return false;
            }

        })
        this.variable = true;
        // console.log(this.annonceList);
    }




}