import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usernameValue: string = '';
  nameValue: string = '';
  idValue: string = '';

  constructor(private http: HttpClient) {}

  // HTTP header
  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  }

  toggleDelete() {
    // Delete the document in the test database where the id = idValue
    let obs: Observable<object> = this.http.delete('http://localhost:3000/delete/example/' + this.idValue);
    obs.subscribe(response => {
      console.log(response.toString());
    });
  }

  toggleUpdate() {
    // Update the document in the test database where the id = idValue
    let obs: Observable<Object> = this.http.patch('http://localhost:3000/update/example/' + this.idValue,
      {username: this.usernameValue, name: this.nameValue}, this.requestOptions);
    obs.subscribe(response => {
      console.log(response);
    });
  }

  toggleCreate() {
    // Create a new document in the test database (with the _id automatically generated) with the JSON body
    // provided
    let obs: Observable<Object> = this.http.post('http://localhost:3000/create/example',
      {username: this.usernameValue, name: this.nameValue}, this.requestOptions);
    obs.subscribe(response => {
      console.log(response);
    });
  }

  toggleRead() {
    // Pass an empty body to find all documents
    let obs: Observable<Object> = this.http.post('http://localhost:3000/read/example/', {}, this.requestOptions);
    obs.subscribe(response => {
      console.log(response)
    });
  }

  ngOnInit(): void {
  }

}
