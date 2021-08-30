import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

const API = 'http://localhost:5000/api/v1/users/';

declare var jQuery:any;

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  Employee: any = [];
  show = true;
  add : boolean;
  error = '';
  window = window;
  username: any
	page = 0;
	count = 0;
	tableSize = 10;
	tableSizes = [10, 5, 15];
	currentIndex;
  constructor(private http: HttpClient,private authService:AuthService) { }

  ngOnInit(): void {

    this.getEmployees();

  }

  reactiveForm = new FormGroup({
    title: new FormControl(),
    username: new FormControl(),
    surname: new FormControl(),
    first_name: new FormControl(),
    other_name: new FormControl(),
    email: new FormControl(),
    gender: new FormControl(),
    address:new FormControl(),
    phone_number: new FormControl(),
    
  });

  getEmployees(){
    return this.http.get(API + 'all').subscribe(
      data =>{
        this.Employee = data;
      },
      error => {
       this.error = error
      }
    )
  }

  getEmployee(username:string){
    return this.authService.getEmployee(username).subscribe(
       (data:any) => {
        this.username = data.data.username
        this.reactiveForm.patchValue(data.data);
       },
       errorMessage => {
         this.window.alert(errorMessage);
       },
     );
  };  

  onClose(){

    this.reactiveForm.reset();

  }

  editEmployee(){
    
    this.authService.edit(this.reactiveForm.value).subscribe(
      data => {
        this.window.alert("Update Successfull");

        jQuery('#ModalCenter').modal('hide');

      },
      errorMessage => {
        this.window.alert(errorMessage);
      }
    )
  }
	
	onTableDataChange(event){
	   this.page = event;
	   this.getEmployees();
	}  
	
	onTableSizeChange(event): void {
		this.tableSize = event.target.value;
		this.page = event ;
		this.getEmployees();
	} 

}
