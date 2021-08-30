import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  form: any = {};

  isLoggedIn = false;

  isLoginFailed = false;

  forgotPassword = false;

  requestPasswordReset = false;

  isSuccessfull = false;

  fieldTextType: Boolean;

  surname:string;

  firstname:string

  constructor(private router: Router, private authService: AuthService,
    private alertService: AlertService, private route: ActivatedRoute) { 
   
    }

  ngOnInit() {
   
  if (this.authService.getUser()){

        this.isLoggedIn = true;

     }
  }
  onSubmit(form:NgForm){

    if (form.invalid) {

      return;

    }

    this.authService.adminlogin(this.form).subscribe(

        data => {

        this.isLoginFailed = false;

        this.isLoggedIn = true;

        this.forgotPassword = false;

        this.isSuccessfull = true;

        this.requestPasswordReset = false;
   
        this.reloadPage();
     
      },

      errorMessage => {
    
        this.alertService.error(errorMessage)

        this.isLoginFailed = true;

        setTimeout(() => {

          this.onClose()

        },2500)

      form.reset()

      }

    )

  }

  requestResetCode(form: NgForm){

    if (form.invalid) {

      return;

    }

    this.authService.requestPasswordReset(this.form.email).subscribe(

      data => {

        this.forgotPassword = true;

        this.isLoggedIn = false;

        this.requestPasswordReset = false;

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

        this.isLoggedIn = false;

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

    window.location.assign('/home')

  }

  onClose(){

    this.alertService.clear()

  }

  forgotPass(){

    this.forgotPassword = true

  }

  requestCode(){

    this.requestPasswordReset = true;

  }

  toSignUp(){

    this.router.navigate(['/register']);

  }

  toggleFieldTextType(){

    this.fieldTextType = !this.fieldTextType;

  }

}
