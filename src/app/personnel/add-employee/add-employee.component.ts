import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../alert/alert.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  form: any = {};


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
  Positions = ['Rector','Deputy Rector','Registrar','Bursar','Director','AG.Director','Dean','H.O.D','Senior Lecturer','Junior Lecturer',
                'Secretary','Engineer','Librarian']

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private authService: AuthService,
              private alertService: AlertService,
            
              ) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm) {

    this.authService.register(this.form).subscribe(

      data => {

        this.alertService.success('Registration Successful');
        
        form.reset()
    
      },
      
      errorMessage => {

        this.alertService.error(errorMessage)

        setTimeout(() => {

          this.onClose()

        },8000)

      }

    )
    
  }

  toggleFieldTextType(){

    this.fieldTextType = !this.fieldTextType;

  }

  // reloadPage(){

  //   window.location.reload()

  // }
  onClose(){

    this.alertService.clear()

  }
}
