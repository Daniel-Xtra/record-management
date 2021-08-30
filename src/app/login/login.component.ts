import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../alert/alert.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})

export class LoginComponent implements OnInit {
 showUser = true;
 userShow = false;
 adminShow = false
 showAdmin = true;
 showContainer = true;

  constructor(private route: ActivatedRoute,) {
  
  }

  ngOnInit(){

    this.showAdmin = true;
    this.showUser = true

  }
  user(){
    this.userShow = true;
    this.adminShow = false;
    this.showContainer = false

  }
  admin(){
    this.userShow = false;
    this.adminShow = true;
    this.showContainer = false;
  }

}