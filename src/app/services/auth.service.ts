import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap, map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject } from 'rxjs';
import {AuthData} from './auth.model';

const AUTH_API = "http://localhost:5000/api/v1/auth/";
const API = "http://localhost:5000/api/v1/profiles/";
const USER = "http://localhost:5000/api/v1/users/";
const BIODATA = "http://localhost:5000/api/v1/biodatas/"

  const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json'})

  };

const USER_KEY = 'resData';
const TOKEN = 'token';
const USERNAME = 'username';
const EXPIRES = 'expiresIn'

  @Injectable({ providedIn: 'root' })

export class AuthService {

 

  private currentUserSubject: BehaviorSubject<AuthData>

  public currentUser: Observable<AuthData>
   private  token: any;
   
  

  // private authStatusListener = new Subject<boolean>();

  constructor(private http:HttpClient, private router: Router) {

    this.currentUserSubject = new BehaviorSubject<AuthData>(JSON.parse(sessionStorage.getItem('resData')));

    this.currentUser = this.currentUserSubject.asObservable();
 
  }

  getToken() {

    return JSON.parse(sessionStorage.getItem(TOKEN))

  }

  getUser() {

    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  getBiodata(email:string){
    return this.http.get(BIODATA + email)
  }

  getEmployee(username:string){
    return this.http.get(USER + username, httpOptions)
  }

  getUsername(){
    return this.currentUserValue.data.user.username
  }

  public get currentUserValue(): AuthData {

    return this.currentUserSubject.value;

  }
 

  
  login(credentials) {

      return this.http.post<AuthData>(AUTH_API + 'signin', {

        username: credentials.username,

        password: credentials.password

      },httpOptions).pipe(map(response => {

        const token = response.data.token;

        this.token = token;

        if(token){   
  
          this.currentUserSubject.next(response)
          var now = new Date();
          now.setSeconds(now.getSeconds()  + (2 * 60) ); //timestamp
          now = new Date(now); //Date Object
          console.log(now);
          this.currentUserValue.data.expiresIn = now
          this.saveAuthData(response) 
  
           
        }
        
    }))

  
  }


  adminlogin(credentials) {

    return this.http.post<AuthData>(AUTH_API + 'admin-signin', {

      username: credentials.username,

      password: credentials.password

    },httpOptions).pipe(map(response => {

      const token = response.data.token;

      this.token = token;

      if(token){   

        this.currentUserSubject.next(response)
        var now = new Date();
        now.setSeconds(now.getSeconds()  + (2 * 60) ); //timestamp
        now = new Date(now); //Date Object
        console.log(now);
        this.currentUserValue.data.expiresIn = now
        this.saveAuthData(response) 
         
      }
       
  }))


  }

  adminRegister(user): Observable<any> {

    return this.http.post(AUTH_API + 'admin-signup', {

      title: user.title, surname: user.surname, username: user.username, email:user.email, password: user.password, gender: user.gender, phone_number: user.phone_number,

      first_name: user.first_name, other_name: user.other_name, marital_status: user.marital_status, address: user.address, date_of_birth: user.date_of_birth,
      
      genotype: user.genotype, blood_group: user.blood_group, religion: user.religion, state: user.state, local_govt: user.local_govt, position: user.position,

      department: user.department, category: user.category, school: user.school, nktitle: user.nktitle, nkaddress: user.nkaddress, nksurname: user.nksurname,

      nkfirst_name: user.nkfirst_name, relationship: user.relationship, nkphone_number: user.nkphone_number, nationality: user.nationality

    }, httpOptions)

  }

  register(user): Observable<any> {

    return this.http.post(AUTH_API + 'signup', {

      title: user.title, surname: user.surname, username: user.username, email:user.email, password: user.password, gender: user.gender, phone_number: user.phone_number,

      first_name: user.first_name, other_name: user.other_name, marital_status: user.marital_status, address: user.address, date_of_birth: user.date_of_birth,
      
      genotype: user.genotype, blood_group: user.blood_group, religion: user.religion, state: user.state, local_govt: user.local_govt, position: user.position,
 
      department: user.department, category: user.category, school: user.school, nktitle: user.nktitle, nkaddress: user.nkaddress, nksurname: user.nksurname,
 
      nkfirst_name: user.nkfirst_name, relationship: user.relationship, nkphone_number: user.nkphone_number, nationality: user.nationality

    }, httpOptions)

  }

  edit(user){
    return this.http.put(USER + 'update',{
     title: user.title, surname: user.surname, username: user.username, email:user.email, password: user.password, gender: user.gender, phone_number: user.phone_number,

     first_name: user.first_name, other_name: user.other_name, marital_status: user.marital_status, address: user.address, date_of_birth: user.date_of_birth,
      
     genotype: user.genotype, blood_group: user.blood_group, religion: user.religion, state: user.state, local_govt: user.local_govt, position: user.position,

     department: user.department, category: user.category, school: user.school, nktitle: user.nktitle, nkaddress: user.nkaddress, nksurname: user.nksurname,
 
     nkfirst_name: user.nkfirst_name, relationship: user.relationship, nkphone_number: user.nkphone_number, nationality: user.nationality

    },httpOptions)
  }

  autoLogin() {

    const expires = JSON.parse(sessionStorage.getItem('expiresIn'))

    if (!expires) {

      return;
      
    }

      if (expires) {

        // this.currentUserSubject.next(expires);
  
        const now = new Date(expires).getMinutes() -  new Date().getMinutes();
  
        this.autoLogout(now * 60 * 1000);
   
      }
// 
  }

  autoLogout(now:number) {

    console.log(now)

   setTimeout(() => {

      this.logout();

    },now);

  }

  logout() {
    
    this.http.post<any>(AUTH_API + 'logout', {withCredentials:true}).subscribe();
    // this.stopRefreshTokenTimer();
    this.clearAuthData()

    this.currentUserSubject.next(null)
   
    this.router.navigate(['/login'])

  }

  requestPasswordReset(email:string){
    return this.http.post<AuthData>(AUTH_API + 'request-reset/' + email,{
      email: email
    })
  }

  verifyCode(code: string) {
    const queryParams = `?c=${code}`;
   return this.http
    .get(
      AUTH_API + "verify-code" + queryParams
      )
  }

  resetPassword(credentials){
    return this.http.post<AuthData>(AUTH_API + 'reset-password', {
      code: credentials.code,
      password: credentials.password
    },httpOptions)
  }

  editProfile(user){

    return this.http.put(API + "update",{
      title: user.title, surname: user.surname, username: user.username, email:user.email, password: user.password, gender: user.gender, phone_number: user.phone_number,
 
      first_name: user.first_name, other_name: user.other_name, marital_status: user.marital_status, address: user.address, date_of_birth: user.date_of_birth,
      
      genotype: user.genotype, blood_group: user.blood_group, religion: user.religion, state: user.state, local_govt: user.local_govt, position: user.position,
 
      department: user.department, category: user.category, school: user.school, nktitle: user.nktitle, nkaddress: user.nkaddress, nksurname: user.nksurname,
 
      nkfirst_name: user.nkfirst_name, relationship: user.relationship, nkphone_number: user.nkphone_number, nationality: user.nationality
    },httpOptions)
 
  }

  refreshToken(){

    return this.http.post<any>(AUTH_API + 'refresh-token', {withCredentials:true})

      .pipe(map(user => {

        this.currentUserSubject.next(user);

        this.startResfreshTokenTimer();

        return user;

      }))

  }

  private refreshTokenTimeout;

  private startResfreshTokenTimer(){

    var now = new Date();

    now.setSeconds(now.getSeconds()  + (30 * 60) ); //timestamp

    now = new Date(now); //Date Object
    sessionStorage.setItem('tokenDate',JSON.stringify(now))

    const jwtToken = JSON.parse(atob(this.currentUserValue.data.token.split('.')[1]));
    // sessionStorage.setItem('jwtToken',JSON.stringify(jwtToken))

    // const expires = new Date(jwtToken.exp/jwtToken.exp + (2 * 60 * 1000));

    const expires = (Math.floor(+now/+now) + (30 * 60 * 1000));
    // sessionStorage.setItem('expires',JSON.stringify(expires))
   
    const timeout = expires  - (1 * 60 * 1000);
    sessionStorage.setItem('timeout',JSON.stringify(timeout))
   
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout)
    // sessionStorage.setItem('refresh',JSON.stringify(this.refreshTokenTimeout))

    // this.currentUserValue.data._tokenExpirationDate = now

    // this.autoLogout(Math.floor(+now/+now) + (2 * 60 * 1000));

    // const token = this.currentUserValue.data.token
    // sessionStorage.setItem('token',token)

    // const email = this.currentUserValue.data.userData.email
    // sessionStorage.setItem('email',email)
  }

  private clearAuthData() {

    sessionStorage.clear();
    
  }

  // private getAuthData() {
  //   const token = sessionStorage.getItem("token");
  //   const expirationDate = sessionStorage.getItem("expiration");
  //   const userId = sessionStorage.getItem("userId");
  //   if (!token || !expirationDate) {
  //     return {
  //       token: token,
  //       expirationDate: new Date(expirationDate),
  //       userId: userId
  //     };
  //   }
  //   // return {
  //   //   token: token,
  //   //   expirationDate: new Date(expirationDate),
  //   //   userId: userId
  //   // };
  // }

  // private stopRefreshTokenTimer(){

  //   clearTimeout(this.refreshTokenTimeout);
    
  // }

  private saveAuthData(response) {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY,JSON.stringify(response))
    sessionStorage.setItem(EXPIRES,JSON.stringify(response.data.expiresIn.toISOString()))
    sessionStorage.setItem(TOKEN, JSON.stringify(response.data.token))
    sessionStorage.setItem(USERNAME,JSON.stringify(response.data.user.username))
   
  }

}

