import { Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { AuthData } from '../services/auth.model';
import { Role } from '../services/role';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  
  private userSub: Subscription;

  
  isLoggedIn = false;

  connected;

  isAuthenticated: AuthData;

  role:any



  constructor( private authService: AuthService) { 

    this.authService.currentUser.subscribe(x => this.isAuthenticated = x)
    this.authService.currentUser.subscribe(
      data => this.role = data.data.user.membership_type
    )

  }

  ngOnInit(): void {}
 
  isAdmin(){

    return this.isAuthenticated.data.user.membership_type === Role.admin

  }

  logout(){  

    this.authService.logout();

    // window.location.reload();
 
  }

  ngOnDestroy() {

    this.userSub.unsubscribe();

  }
  
}
