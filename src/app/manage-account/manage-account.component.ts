import { Component, OnInit } from '@angular/core';


declare var jQuery:any ;

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    jQuery(document).ready(function() {
      jQuery('#example').DataTable();
      } ); 
  }

}
