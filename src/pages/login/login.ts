import { Component } from '@angular/core';
import { NavController,
   LoadingController,
  AlertController , Platform} from 'ionic-angular';
import {Http} from '@angular/http'; 
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';

import { TabsPage } from '../tabs/tabs';
//import { ChoixPage } from '../choix/choix';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { EmailValidator } from '../../validators/email';
declare var window : any ;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm: any;
  public loading: any;
   public error: any;

  constructor(public navCtrl: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController , private platform:Platform , private http :Http) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }

  loginUser(){

  if (!this.loginForm.valid){
    console.log(this.loginForm.value);
  } else {
    this.authData.loginUser(this.loginForm.value.email, 
      this.loginForm.value.password).then( authData => { 
         this.loading.dismiss().then(() => {
        this.navCtrl.setRoot(TabsPage);
  })
} , error => {
    this.loading.dismiss().then( () => {
      let alert = this.alertCtrl.create({
        message: error.message,
        buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
        ]
  });
    alert.present();
  });
    });

  this.loading = this.loadingCtrl.create({
 
  });
  this.loading.present();
  }}

  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  createAccount(){
    this.navCtrl.push(SignupPage);
  }

 loginUserWithFacebook() {
    this.authData.loginWithFacebook().subscribe(data => {
      this.navCtrl.setRoot(TabsPage);
    }, err => {
      this.error = err;
    });
  }



  }
