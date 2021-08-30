import {Role} from './role';
export class AuthData {
  
  data : {
 
     token: string,
     expiresIn: Date,
     sid: string,
     user:{
      surname:string,
      first_name:string,
      last_name: string,
      email: string,
      id: string,
      username:string,
      password: string,
      gender: string,
      phone_number: string,
      city:string,
      membership_type:Role,
      
     }

  }
  static data: any;

}


