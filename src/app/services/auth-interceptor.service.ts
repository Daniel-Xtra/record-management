import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { AuthService } from './auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next:HttpHandler) {
        let authReq = req;
        const authToken = this.authService.getToken();
        if(authToken!=null) {
            authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer' +  authToken)});
        }
        return next.handle(authReq);
    }
}

// import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { AuthService } from "./auth.service";
  
// @Injectable()
// export class AuthInterceptorService implements HttpInterceptor {
//     constructor(private authService: AuthService) {}
  
//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//       const authToken = this.authService.getToken();
//       const authRequest = req.clone({
//         headers: req.headers.set("Authorization", "Bearer " + authToken)
//       });
//       return next.handle(authRequest);
//     }
// }
  

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
]