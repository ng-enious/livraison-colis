import { NavController, AlertController  } from 'ionic-angular';
import { Component , ViewChild} from '@angular/core';
//import { Camera, CameraOptions } from 'ionic-native';
import { Nav} from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
@Component({
  selector: 'page2',
  templateUrl: 'page2.html',
})
export class Page2  {
  userDataLoaded: boolean = false;

  public users : any;
  public birthDate: string;
 @ViewChild(Nav)nav: Nav ;

  constructor(public appCtrl: App ,public navCtrl: NavController, public profileData: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController) {
  }

  ionViewDidEnter(){
    this.profileData.getUserProfile().on('value', (data) => {
      this.users = data.val();
      this.birthDate = this.users.birthday;
    });
  }



  updateUserName(){
    let alert = this.alertCtrl.create({
      message: "Your username ",
      inputs: [
        {
          name: 'username',
          placeholder: 'Your username',
          value: this.users.username
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateUserName(data.username);
          }
        }
      ]
    });
    alert.present();
  }
  updateFullName(){
     let alert = this.alertCtrl.create({
      message: "Your fullName ",
      inputs: [
        {
          name: 'fullname',
          placeholder: 'Your fullName',
          value: this.users.fullname
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateFullName(data.fullname);
          }
        }
      ]
    });
    alert.present();

  }

  updateDOB(birthDate){
    this.profileData.updateDOB(birthDate);
  }

  updateEmail(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email',
        },
        {
          name: 'password',
          placeholder: 'Your password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateEmail(data.newEmail, data.password);
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword(){
    let alert = this.alertCtrl.create({
      inputs: [
      
        {
          name: 'oldPassword',
          placeholder: 'Your old password',
          type: 'password'
        },
          {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updatePassword(data.oldPassword , data.newPassword);
          }
        }
      ]
    });
    alert.present();
  }


  updatePhoneNumber()
  {
 let alert = this.alertCtrl.create({
      message: "Your phone number  ",
      inputs: [
        {
          name: 'phoneNumber',
          placeholder: 'Your phone number ',
          value: this.users.phone
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updatePhoneNumber(data.phoneNumber);
          }
        }
      ]
    });
    alert.present();

  }

   logoutApp(){
    this.authData.logoutUser().then(() => {
        //this.navCtrl.setRoot(LoginPage)

        this.appCtrl.getRootNav().setRoot(LoginPage); 
    });
  }





//   openImageOptions() {
//     var self = this;

//     let actionSheet = self.actionSheeCtrl.create({
//       title: 'Upload new image from',
//       buttons: [
//         {
//           text: 'Camera',
//           icon: 'camera',
//           handler: () => {
//             self.openCamera(Camera.PictureSourceType.CAMERA);
//           }
//         },
//         {
//           text: 'Album',
//           icon: 'folder-open',
//           handler: () => {
//             self.openCamera(Camera.PictureSourceType.PHOTOLIBRARY);
//           }
//         }
//       ]
//     });

//     actionSheet.present();
//   }

//   openCamera(pictureSourceType: any) {
//     var self = this;

//     let options: CameraOptions = {
//       quality: 95,
//       destinationType: Camera.DestinationType.DATA_URL,
//       sourceType: pictureSourceType,
//       encodingType: Camera.EncodingType.PNG,
//       targetWidth: 400,
//       targetHeight: 400,
//       saveToPhotoAlbum: true,
//       correctOrientation: true
//     };

//     Camera.getPicture(options).then(imageData => {
//       const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
//         const byteCharacters = atob(b64Data);
//         const byteArrays = [];

//         for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//           const slice = byteCharacters.slice(offset, offset + sliceSize);

//           const byteNumbers = new Array(slice.length);
//           for (let i = 0; i < slice.length; i++) {
//             byteNumbers[i] = slice.charCodeAt(i);
//           }

//           const byteArray = new Uint8Array(byteNumbers);

//           byteArrays.push(byteArray);
//         }

//         const blob = new Blob(byteArrays, { type: contentType });
//         return blob;
//       };

//       let capturedImage: Blob = b64toBlob(imageData, 'image/png');
//       self.startUploading(capturedImage);
//     }, error => {
//       console.log('ERROR -> ' + JSON.stringify(error));
//     });
//   }

//  loadUserProfile() {
//     var self = this;
//     self.userDataLoaded = false;
    
//     self.getUserData().then(function (snapshot) {
//       let userData: any = snapshot.val();

//       self.getUserImage().then(function (url) {
//         self.userProfile = {
//           username: userData.username,
//           dateOfBirth: userData.dateOfBirth,
//           image: url,
//           totalFavorites: userData.hasOwnProperty('favorites') === true ?
//             Object.keys(userData.favorites).length : 0
//         };

//         self.user = {
//           uid : self.firebaseAccount.uid,
//           username : userData.username
//         };

//         self.userDataLoaded = true;
//       }).catch(function (error) {
//         console.log(error.code);
//         self.userProfile = {
//           username: userData.username,
//           dateOfBirth: userData.dateOfBirth,
//           image: 'assets/images/profile.png',
//           totalFavorites: userData.hasOwnProperty('favorites') === true ?
//             Object.keys(userData.favorites).length : 0
//         };
//         self.userDataLoaded = true;
//       });
//     });

   
//   }

//   getUserData() {
//     var self = this;

//     self.firebaseAccount = self.authService.getLoggedInUser();
//     return self.dataService.getUser(self.authService.getLoggedInUser().uid);
//   }

//   getUserImage() {
//     var self = this;

//     return self.dataService.getStorageRef().child('images/' + self.firebaseAccount.uid + '/profile.png').getDownloadURL();
//   }


//    reload() {
//     this.loadUserProfile();
//   }

//  startUploading(file) {

//     let self = this;
//     let uid = self.authService.getLoggedInUser().uid;
//     let progress: number = 0;
//     // display loader
//     let loader = this.loadingCtrl.create({
//       content: 'Uploading image..',
//     });
//     loader.present();

//     // Upload file and metadata to the object 'images/mountains.jpg'
//     var metadata = {
//       contentType: 'image/png',
//       name: 'profile.png',
//       cacheControl: 'no-cache',
//     };

//     var uploadTask = self.dataService.getStorageRef().child('images/' + uid + '/profile.png').put(file, metadata);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on('state_changed',
//       function (snapshot) {
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       }, function (error) {
//         loader.dismiss().then(() => {
//           switch (error.code) {
//             case 'storage/unauthorized':
//               // User doesn't have permission to access the object
//               break;

//             case 'storage/canceled':
//               // User canceled the upload
//               break;

//             case 'storage/unknown':
//               // Unknown error occurred, inspect error.serverResponse
//               break;
//           }
//         });
//       }, function () {
//         loader.dismiss().then(() => {
//           // Upload completed successfully, now we can get the download URL
//           var downloadURL = uploadTask.snapshot.downloadURL;
//           self.dataService.setUserImage(uid);
//           self.reload();
//         });
//       });
//   }
 
}
