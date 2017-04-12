import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class ProfileData {
  public users: firebase.database.Reference;
  public currentUser: firebase.User;


  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.users = firebase.database().ref('/users');

  }

  getUserProfile(): firebase.database.Reference {
    return this.users.child(this.currentUser.uid);
  }

  updateUserName(userName : string): firebase.Promise<any> {
    return this.users.child(this.currentUser.uid).update({
      username : userName 
    });
  }

   updateFullName(fullName : string): firebase.Promise<any> {
    return this.users.child(this.currentUser.uid).update({
      fullname : fullName 
    });
  }

  updateDOB(birthDate: string): firebase.Promise<any> {
    return this.users.child(this.currentUser.uid).update({
      birthday:birthDate,
    });
  }

  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, password);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updateEmail(newEmail).then( user => {
        this.users.child(this.currentUser.uid)
          .update({ email: newEmail });
      });
    });
  }


  updatePassword(oldPassword: string , newPassword: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updatePassword(newPassword).then( user => {
        console.log("Password Changed");
         this.users.child(this.currentUser.uid)
          .update({ password : newPassword  });
      }, error => {
        console.log(error);
      });
    });
  }

    updatePhoneNumber( phoneNumber : string) : firebase.Promise<any> {
      return this.users.child(this.currentUser.uid).update({
      phone : phoneNumber  
    });


    }


}
