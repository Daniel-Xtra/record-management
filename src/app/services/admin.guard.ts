import {  Injectable } from '@angular/core';
import { Router, 
        CanActivate,
        CanActivateChild, 
        ActivatedRouteSnapshot,
         RouterStateSnapshot, 
         CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from './auth.service';


@Injectable({providedIn: 'root'})


export class AuthenticateGuard implements CanActivate,CanActivateChild {
    constructor(private router: Router, private authService: AuthService){}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot){
        const currentUser = this.authService.currentUserValue;
        if(currentUser){
            if(route.data.membership_type && route.data.membership_type.indexOf(currentUser.data.user.membership_type) === -1){
                this.router.navigate(['/profile']);
                return false;
            }
            return true;
        }
        
        this.router.navigate(['/'],{queryParams:{returnUrl:state.url}});
        return false;
        

    }  

    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
    }

}
