import { Component } from '@angular/core';
import { NavController, NavParams , AlertController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
resetPasswordForm: any;
  constructor(public nav: NavController, public navParams: NavParams , 
  public authData: AuthData, public formBuilder: FormBuilder,
  public alertCtrl: AlertController) {

    this.resetPasswordForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required,
            EmailValidator.isValid])]
    })
  }
  resetPassword(){
    if (!this.resetPasswordForm.valid){
        console.log(this.resetPasswordForm.value);
    } else {
        this.authData.resetPassword(this.resetPasswordForm.value.email)
        .then((user) => {
            let alert = this.alertCtrl.create({
                message: "We just sent you a reset link to your email",
                buttons: [{ text: "Ok", role: 'cancel',
                    handler: () => {
                        this.nav.pop();
                    }
                }]
            });
        alert.present();
        }, (error) => {
            var errorMessage: string = error.message;
            let errorAlert = this.alertCtrl.create({
                message: errorMessage,
                buttons: [{ text: "Ok", role: 'cancel' }]
            });

            errorAlert.present();
        });
    }
}

 

}
