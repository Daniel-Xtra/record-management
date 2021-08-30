import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};

  isSuccessful = false;

  isSignUpFailed = false;
  window = window;
  // errorMessage = '';

  fieldTextType:Boolean;

  States = ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo',
            'Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Kastina','Kebbi','Kogi','Kwara','Lagos',
            'Nassarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];

  School = ['Pure and Applied Science','Communication and Information Technology','Engineering','Environmental Studies',
              'Management Studies'];
              
  Departments = ['Food Technology','Science Technology Laboratory','Hospitality Management','Mathematics and Statistics',
              'Computer Science','Nutrition and Dietetics','Library and Information Science','Mass Communication',
              'Electrical/Electronic Engineering','Mechanical Engineeriing', 'Agricultural and Bio-Environmental Engineering Technology',
             ' Building Technology','Estate Managemment and Valuation', 'Quantity Surveying','Urban & Regional planning',
             'Surveying & Geoinformatics','Architectural Technology','Arts & Design','Transportation Planning & Management',
            'Accountancy','Banking and Finance','Business Adminstration and Management','General Studies','Marketing',
            'Public Administration','Insurance','Taxation']; 
              
  Positions = ['Rector','Deputy Rector','Registrar','Bursar','Director','AG.Director','Dean','H.O.D','Senior Lecturer','Lecturer',
                'Secretary','Engineer','Librarian']

  private authStatusSub: Subscription;

  // signupForm : FormGroup;

  constructor(private router: Router, 
              private authService: AuthService,
              private alertService: AlertService
              ) { }

  ngOnInit() {
    
    // this.signupForm = new FormGroup({
    //   'title' : new FormControl(null),
    //   'username': new FormControl(null, Validators.required),
    //   'gender': new FormControl('male', Validators.requiredTrue),
    //   'first_name': new FormControl(null),
    //   'other_name': new FormControl(null),
    //   'surname': new FormControl(null),
    //   'password': new FormControl(null, Validators.requiredTrue),
    //   'email': new FormControl(null, [Validators.required, Validators.email]),
    //   'date_of_birth': new FormControl(null),
    //   "marital_status": new FormControl(null),
    //   "religion": new FormControl(null),
    //   "nationality": new FormControl(null),
    //   "state": new FormControl(null),
    //   "local_govt": new FormControl(null),
    //   "phone_number": new FormControl(null,Validators.required),
    //   "address": new FormControl(null),
    // })

    if (this.authService.getUser()){

      this.isSuccessful = true;

    }

  }

  onSubmit(form:NgForm){

    // if (form.invalid) {

    //   return;

    // }
 
    this.authService.adminRegister(this.form).subscribe(

      data => {

        console.log(data);

        this.isSuccessful = true;

        this.isSignUpFailed = false;

        // this.alertService.success(this.errorMessage);

        form.reset();

      //  setTimeout(() => { 

      //   this.router.navigate(['/adminLogin'])

      //  },2000)

        // this.reloadPage()

      },
      
      errorMessage => {

        this.alertService.error(errorMessage)

        this.isSignUpFailed = true;

        console.log(errorMessage)

        

      }

    )
    
  }

  toggleFieldTextType(){

    this.fieldTextType = !this.fieldTextType;

  }

  reloadPage(){

    window.location.reload()

  }

  onClose(){

    this.alertService.clear()

  }

}