
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

const API = 'http://localhost:5000/api/v1/users/';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})


export class PersonnelComponent implements OnInit {

 

  constructor(private http: HttpClient,private alertService:AlertService) { }


  ngOnInit(): void {
   
  }

  // getEmployee(username:string){
  //   return this.http.get(API + username).subscribe(
  //     data =>{
  //       this.Employee = data
  //       console.log(data)
  //     },
  //     errorMessage => {
  //      this.alertService.error(errorMessage)
  //     }
  //   )
  //  }



  updateEmployee(){
    return this.http.put(API + 'update',{
      
    }).subscribe(
      data => {
      },
      errorMesage => {
        this.alertService.error(errorMesage)
      }
    )
  }

 
  


}
