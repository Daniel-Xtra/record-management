import { Component,OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  name = "Angular";
  isLoading = true
 
  constructor(private authService: AuthService) {}

  ngOnInit() {

    setTimeout(() => {

      this.isLoading = false

    },2000)  
    

    // this.authService.autoLogin()

  }
  
}
