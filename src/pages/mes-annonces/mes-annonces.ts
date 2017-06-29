import { Component } from '@angular/core';
import { NavController , AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { AnnonceData } from '../../providers/annonce-data';
import { TransportPage } from '../transport/transport';
import { ListOfDmdPage } from '../list-of-dmd/list-of-dmd';

@Component({
    selector: 'page-mes-annonces',
    templateUrl: 'mes-annonces.html'
})
export class MesAnnoncesPage {


    public annonces: any;
    public demandes: any;
    public currentUser: string;

    constructor(public navCtrl: NavController, public annonceData: AnnonceData, public alertCtrl: AlertController) {


    }

    ionViewDidEnter() {
        this.currentUser = firebase.auth().currentUser.uid;
        this.annonceData.getAnnoncesList()
            .orderByChild("user_id")
            .equalTo(this.currentUser)
            .on('value', snapshot => {
                let rawList = [];
                snapshot.forEach(snap => {
                    rawList.push({
                        id: snap.key,
                        user_id: snap.val().user_id,
                        title: snap.val().title,
                        date: snap.val().date,
                        demandes: snap.val().demandes,
                        description: snap.val().description,
                        adresse_dep: snap.val().adresse_dep,
                        adresse_arr: snap.val().adresse_arr,
                        type_obj: snap.val().type_obj
                    });
                    return false
                });
                this.annonces = rawList;
            });
    }
    AddNewA() {

        let annonce = {
            title: '',
            type_obj: '',
            description: '',
            date: '',
            adresse_dep: '',
            adresse_arr: ''
        };
        this.navCtrl.push(TransportPage, {
            annonceE: annonce
        });
    }

    edit(annonce) {
        //console.log(annonce);

        this.navCtrl.push(TransportPage, {
            annonceE: annonce
        });
    }
    removeA(annonce) {
        let alert = this.alertCtrl.create({
            title: 'Message de confirmation ',
            message: 'Voulez vous vraiment  supprimer cette annonce ?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('suppression annulée ');
                    }
                },
                {
                    text: 'supprimer',
                    handler: () => {
                     
                        this.annonceData.deleteAnnonce(annonce);

                    }
                }
            ]
        });
        alert.present();
    }


    goToListDmd(annonceid) {
     
        this.navCtrl.push(ListOfDmdPage, {
       annonceId: annonceid
    })
    }
}