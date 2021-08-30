import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.component.html',
  styleUrls: ['./biodata.component.css']
})
export class BiodataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  reactiveForm = new FormGroup({
    title: new FormControl(),
    username: new FormControl(),
    surname: new FormControl(),
    first_name: new FormControl(),
    other_name: new FormControl(),
    date_of_birth: new FormControl(),
    email: new FormControl(),
    gender: new FormControl(),
    marital_status: new FormControl(),
    nationality: new FormControl(),
    address:new FormControl(),
    state: new FormControl(),
    religion: new FormControl(),
    phone_number: new FormControl(),
    profile_picture_url: new FormControl(),
    local_govt: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl(),
    userId: new FormControl()
  })
 

}
