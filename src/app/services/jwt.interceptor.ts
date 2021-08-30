import {  Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable} from 'rxjs';

import { AuthService } from '../services/auth.service';
// import { TokenStorageService } from './token-storage.service';

@Injectable({providedIn: 'root'})

export class JwtInterceptor implements HttpInterceptor{
    
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        let resData = this.authService.currentUserValue
  
        let authToken = this.authService.getToken()
        
        if(resData && authToken){

            request = request.clone({

                setHeaders:{

                    Authorization:`Bearer ${authToken}`

                }

            });

        }

        return next.handle(request);

    }

}