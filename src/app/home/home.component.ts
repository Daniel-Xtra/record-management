import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import {Dashboard} from './dashboard.model';
import { AuthService } from '../services/auth.service';

const API = "http://localhost:5000/api/v1/education/";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  Senior:any = [];
  Junior: any = [];
  Phd: any = [];
  Personnel:any = [];
  Acade:any = [];
  Nacade:any = [];
  name:any


  constructor(private router:Router,private http:HttpClient, private alertService:AlertService, private authService: AuthService) {
    this.authService.currentUser.subscribe(
      data =>  this.name = data.data.user
    )
  
   }

  ngOnInit(): void {
    // this.getName()
    this.getPhd()
    this.getAcademicStaff()
    this.getJuniorLecturer()
    this.getPersonnel()
    this.getSeniorLecturers()
    this.getNonAcademicStaff()
  }


  getPhd(){
    this.http.get(API + 'doctors').subscribe(
      (data:Dashboard )=> {
        this.Phd = data
      },
      errorMessage => {
        console.log(errorMessage)
      }
    )
  }

  getSeniorLecturers(){
    this.http.get(API + 'senior').subscribe(
      (data:Dashboard )=> {
        this.Senior = data
      },
      errorMessage => {
        console.log(errorMessage)
      }
    )
  }

  getJuniorLecturer(){
    this.http.get(API + 'junior').subscribe(
      (data:Dashboard )=> {
        this.Junior = data
      },
      errorMessage => {
        console.log(errorMessage)
      }
    )
  }

  getPersonnel(){
    this.http.get(API + 'personnel').subscribe(
      (data:Dashboard )=> {
        this.Personnel = data
      },
      errorMessage => {
        console.log(errorMessage)
      }
    )
  }

  getAcademicStaff(){
    this.http.get(API + 'acade').subscribe(
      (data:Dashboard )=> {
        this.Acade = data
      },
      errorMessage => {
        console.log(errorMessage)
      }
    )
  }

  getNonAcademicStaff(){
    this.http.get(API + 'nacade').subscribe(
      (data:Dashboard )=> {
        this.Nacade = data
      },
      errorMessage => {
        console.log(errorMessage)
      }
    )
  }
  
}
