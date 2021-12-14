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

  constructor(private http: HttpClient) {
  }

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  }

  toggleDelete() {
    let obs: Observable<object> = this.http.delete('http://localhost:3000/delete' + '/example/' + this.idValue);
    obs.subscribe(response => {
      console.log(response.toString());
    });
  }

  toggleUpdate() {
    let obs: Observable<Object> = this.http.patch('http://localhost:3000/update/' + this.idValue,
      {username: this.usernameValue, name: this.nameValue, schema: 'example'}, this.requestOptions);
    obs.subscribe(response => {
      console.log(response);
    });
  }

  toggleCreate() {
    let obs: Observable<Object> = this.http.post('http://localhost:3000/create',
      {username: this.usernameValue, name: this.nameValue, schema: 'example'}, this.requestOptions);
    obs.subscribe(response => {
      console.log(response);
    });
  }

  toggleRead() {
    let obs: Observable<Object> = this.http.get('http://localhost:3000/read/example/' + this.idValue);
    obs.subscribe(response => {
      console.log(response)
    });
  }

  ngOnInit(): void {
  }

}
