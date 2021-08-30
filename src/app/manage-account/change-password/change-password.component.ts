import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../alert/alert.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProfileComponent } from '../../profile/profile.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: any = {};

  forgotPassword

  requestPasswordReset

  fieldTextType: Boolean;

  
  constructor( 
    private authService: AuthService,
    private alertService: AlertService,) { }

  ngOnInit(): void {
  }


  requestResetCode(form: NgForm){

    if (form.invalid) {

      return;

    }

    this.authService.requestPasswordReset(this.form.email).subscribe(

      data => {
        this.requestPasswordReset = false;
        this.forgotPassword = true;

      },

      errorMessage => {
    
        this.alertService.error(errorMessage);

        setTimeout(() => {

          this.onClose()

        },2500)

      form.reset();

      }

    )

  }

  onReset(form: NgForm){

    if (form.invalid) {

      return;

    }
    
    this.authService.verifyCode(this.form.code).subscribe(

      data => {

      console.log('correct verification code')

      },
      errorMessage => {

        this.alertService.error(errorMessage)
      }

    );

    this.authService.resetPassword(this.form).subscribe(

      data => {

        this.forgotPassword = false;
      

      },

      errorMessage => {
    
        this.alertService.error(errorMessage);

        setTimeout(() => {

          this.onClose()

        },2500)

      form.reset();

      }
    )
  }

  reloadPage(){

    window.location.assign('/login')

  }

  onClose(){

    this.alertService.clear()

  }
  
  toggleFieldTextType(){

    this.fieldTextType = !this.fieldTextType;

  }
}
