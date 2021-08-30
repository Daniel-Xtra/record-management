import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var jQuery:any ;
const baseUrl = 'http://localhost:5000/api/v1/users/all';
@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {

	Employee: any = [];
	page = 0;
	count = 0;
	tableSize = 7;
	tableSizes = [1,3, 6, 9, 12, 15];
	currentIndex;
	
 	constructor(private http: HttpClient) { }
  
	ngOnInit(): void {
		this.fetchPosts();
	}

	getAllPosts() {
		return this.http.get(baseUrl);
	}

	fetchPosts(): void {
		this.getAllPosts()
		  .subscribe(
			response => {
			  this.Employee = response;
			  console.log(response);
			},
			error => {
			  console.log(error);
			});
	}
	
	onTableDataChange(event){
	   this.page = event;
	   this.fetchPosts();
	}  
	
	onTableSizeChange(event): void {
		this.tableSize = event.target.value;
		this.page = event ;
		this.fetchPosts();
	} 
}
