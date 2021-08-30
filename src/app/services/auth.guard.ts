import {  Injectable } from '@angular/core';
import { Router, 
        CanActivate,
        CanActivateChild, 
        ActivatedRouteSnapshot,
         RouterStateSnapshot, 
         CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from '../services/auth.service';


@Injectable({providedIn: 'root'})


export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService){}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot){
        const currentUser = this.authService.currentUserValue;
        if(currentUser){
            return true;
        }
        else{
            this.router.navigate(['/']);
        return false;
        }

    }  
    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
    }

}