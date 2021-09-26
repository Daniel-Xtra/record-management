import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var jQuery:any ;
// const baseUrl = 'http://localhost:5000/api/v1/users/all';
const baseUrl = "http://localhost:5000/api/v1/profiles";
@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';


	
 	constructor(private http: HttpClient) { }
  
	ngOnInit(): void {
	
	}
	selectFile(event): void {
		this.selectedFiles = event.target.files;
	}
	upload(): void {
		this.progress = 0;
	  
		this.currentFile = this.selectedFiles.item(0);
		this.uploads(this.currentFile).subscribe(
		  event => {
			if (event.type === HttpEventType.UploadProgress) {
			  this.progress = Math.round(100 * event.loaded / event.total);
		
			} else if (event instanceof HttpResponse) {
				
			  this.message = 'Photo upload Successfull!!!'
			}
		  },
		  err => {
			this.progress = 0;
			this.message = 'Could not upload the photo!';
			this.currentFile = undefined;
		  });
		this.selectedFiles = undefined;
	}

	uploads(file: File): Observable<HttpEvent<any>> {
		const formData: FormData = new FormData();
	
		formData.append('photo', file);
	
		const req = new HttpRequest('POST', `${baseUrl}/upload`, formData, {
		  reportProgress: true,
		  responseType: 'json'
		});
	
		return this.http.request(req);
	}

	// uploadImage(file:File): Observable<any>{
	// const formData: FormData = new FormData();
	// formData.append('photo', file);
	//  return  this.http.post(baseUrl + '/upload', formData)
	  
	// }
	// upload1(){
	// 	this.currentFile = this.selectedFiles.item(0);
	// 	this.uploadImage(this.currentFile).subscribe(
	// 		event => {
						
							
	// 					  this.message = 'Photo upload Successfull!!!'
				
	// 				  },
	// 				  err => {
			
	// 					this.message = 'Could not upload the photo!';
	// 					this.currentFile = undefined;
	// 				  });
	// 				this.selectedFiles = undefined;
		
		
	// }

	choose(){
		document.getElementById('fileInput').click();
	}

}
