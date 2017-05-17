import { NavController, AlertController  } from 'ionic-angular';
import { Component , ViewChild} from '@angular/core';
import { Nav} from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
@Component({
    selector: 'page2',
    templateUrl: 'page2.html',
})
export class Page2 {
    userDataLoaded: boolean = false;

    public users: any;
    public birthDate: string;
    @ViewChild(Nav) nav: Nav;

    constructor(public appCtrl: App, public navCtrl: NavController, public profileData: ProfileData,
        public authData: AuthData, public alertCtrl: AlertController) {}

    ionViewDidEnter() {
        this.profileData.getUserProfile().on('value', (data) => {
            this.users = data.val();
            this.birthDate = this.users.birthday;
        });
    }



    updateUserName() {
        let alert = this.alertCtrl.create({
            message: "Your username ",
            inputs: [{
                name: 'username',
                placeholder: 'Your username',
                value: this.users.username
            }],
            buttons: [{
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
    updateFullName() {
        let alert = this.alertCtrl.create({
            message: "Your fullName ",
            inputs: [{
                name: 'fullname',
                placeholder: 'Your fullName',
                value: this.users.fullname
            }],
            buttons: [{
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

    updateDOB(birthDate) {
        this.profileData.updateDOB(birthDate);
    }

    updateEmail() {
        let alert = this.alertCtrl.create({
            inputs: [{
                    name: 'newEmail',
                    placeholder: 'Your new email',
                },
                {
                    name: 'password',
                    placeholder: 'Your password',
                    type: 'password'
                },
            ],
            buttons: [{
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

    updatePassword() {
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
            buttons: [{
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.profileData.updatePassword(data.oldPassword, data.newPassword);
                    }
                }
            ]
        });
        alert.present();
    }


    updatePhoneNumber() {
        let alert = this.alertCtrl.create({
            message: "Your phone number  ",
            inputs: [{
                name: 'phoneNumber',
                placeholder: 'Your phone number ',
                value: this.users.phone
            }],
            buttons: [{
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

    logoutApp() {
        this.authData.logoutUser().then(() => {
            //this.navCtrl.setRoot(LoginPage)

            this.appCtrl.getRootNav().setRoot(LoginPage);
        });
    }

}
