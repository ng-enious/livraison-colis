import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import  { AnnonceData} from '../../providers/annonce-data' ;
import { MissionPage } from '../mission/mission'; 
import firebase from 'firebase';
/*
  Generated class for the ListOfDmd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-of-dmd',
  templateUrl: 'list-of-dmd.html'
})
export class ListOfDmdPage {
annonceId : any ;
currentAnnonce : any ; 
//List from firebase

demandesListF : any ;

demandeList : any ;
missionList :  firebase.database.Reference; 


  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    this.annonceId = this.navParams.data.annonceId;
    this.demandesListF = firebase.database().ref(`annonces/${this.annonceId}/demandes`);  
    this.missionList = firebase.database().ref('/missions') ; 
  }


  ionViewDidEnter(){
    this.getDemandeList().on('value', snapshot => {
                        let rawList = [];
                        snapshot.forEach( snap => {
                          rawList.push({
                           id: snap.key,
                            user_id : snap.val().user_id, 
                            trajet_id : snap.val().trajet_id
                          });
                           return false
                             });

                           this.demandeList = rawList;

                        for ( let dem of  this.demandeList  ){

                       
                             //trajet
                               firebase.database().ref('trajets/').child(dem.trajet_id).on('value', (item : any) => {
                                dem.trajet= item.val();
                             },
                          (error) => {
                            console.log(error);
                         });


                            //user
                             firebase.database().ref('/users/').child(dem.user_id).on('value', (item : any) => {
                             dem.user= item.val();
                         },
                             (error) => {
                               console.log(error);
                           });

                        
                         }
                      
                          console.log(this.demandeList);
                        
                      });

  }

  
    getDemandeList(): firebase.database.Reference {  
    return this.demandesListF;
  }
  
  AcceptDmd( demande ){
    console.log( demande.trajet_id  ) ; 
this.ajouterMission(demande.trajet_id , this.annonceId ).then( () => {
   this.navCtrl.setRoot(MissionPage , {t : demande.trajet , u : demande.user    , dmdId : demande.id , annonce : this.annonceId});

    })

  }

ajouterMission(trajetId : string , annonceId:string):  firebase.Promise<any> {
return this.missionList.push({
annonce_id : annonceId ,
trajet_id : trajetId ,
etat : "en cours"



  });

}

}
