import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../services/auth.service';
import { Profile } from './profile.model'



const API = "http://localhost:5000/api/v1/profiles/";

declare var jQuery:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  profile:any;
  form:any;
  username = this.authService.getUsername();
  fieldTextType:Boolean;
  window = window;


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

  Positions = ['Rector','Deputy Rector','Registrar','Bursar','Director','AG.Director','Dean','H.O.D','Senior Lecturer','Junior Lecturer',
                'Secretary','Engineer','Librarian'];


  constructor(private http: HttpClient, private authService:AuthService, private alertService: AlertService) {}

  ngOnInit(){
    
    this.myProfile(this.username);
  
  };

  myProfile(username){
  
    return this.http.get(API + username).subscribe(
      (data:Profile) => {
        this.profile = data
        this.reactiveForm.patchValue(data.data)
        
      },
      errorMessage => {
        this.alertService.error(errorMessage)
      },
    );
  };

  profileEdit(){
   return this.authService.editProfile(this.reactiveForm.value).subscribe(
      data => {   
        this.window.alert("Update Successfull")
        jQuery('#ModalCenter').modal('hide');
      },
      errorMessage => {
        this.alertService.error(errorMessage);
      },
    );
  };

  // uploadImage(data){
  //   return this.http.post(API + 'upload',data).subscribe(
  //     data => {
  //       this.myProfile(this.username);
  //       console.log(data)
  //     },
  //     error => {       
  //       console.error(error)
  //     }
  //   )
  // }


  reactiveForm = new FormGroup({
    title: new FormControl(),
    username: new FormControl(),
    surname: new FormControl(),
    first_name: new FormControl(),
    other_name: new FormControl(),
    date_of_birth: new FormControl(),
    email: new FormControl(),
    gender: new FormControl(),
    marital_status: new FormControl(),
    nationality: new FormControl(),
    address:new FormControl(),
    state: new FormControl(),
    genotype: new FormControl(),
    blood_group: new FormControl(),
    religion: new FormControl(),
    phone_number: new FormControl(),
    profile_picture_url: new FormControl(),
    local_govt: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl(),
    userId: new FormControl()
  });
 
  toggleFieldTextType(){

    this.fieldTextType = !this.fieldTextType;

  };

  onClose(){
    this.reactiveForm.reset()
  };

  
}


