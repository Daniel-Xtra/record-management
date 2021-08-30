import { Component,OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  name = "Angular";
  isLoading = true
 
  constructor() {}

  ngOnInit() {

    setTimeout(() => {

      this.isLoading = false

    },2000)  

    // this.ss.startSocket()

  }
  
}
