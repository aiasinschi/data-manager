import { User } from '../user';
import { Dataset } from '../dataset';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  private localhost = 'http://localhost:8080';
  private baseUrl = localhost + '/authenticate';
  private baseApiUrl = localhost + '/api/dataset/add';
  private currentUser: User;

  constructor (private http: Http) { }

  getAuthenticatedUser(username: string, password: string): Observable<User> {
    // console.log(this.baseUrl);
    const body = {
        'username': username,
        'password': password
    };
    return this.http.post(this.baseUrl, body,
                new RequestOptions({headers: this.getHeaders()}))
        .map(response => mapUsers(response));
        // .catch(error => { console.log(JSON.stringify(error.json())); } );
  }


  addDatasetForUser(datasets: Dataset[], user: User) {
      const body = {
        'datasets': JSON.stringify(datasets),
        'username': user.username
      };
      this.http.post(this.baseApiUrl, body,
                new RequestOptions({headers: this.getHeaders()}))
  }

  public saveCurrentUser(user: User) {
      this.currentUser = user;
  }

  public resetCurrentUser() {
      this.currentUser = null;
  }

  public getCurrentUser(): User {
      return this.currentUser;
  }

  private getHeaders(): Headers {
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}


function mapUsers(response: Response): User {
   // The response of the API has a results
   // property with the actual results
   return toUser(response.json().user);
  }

 function toUser(r: any): User {
      const user = <User>({
          name: r.name,
          username: r.username,
          password: r.password,
          email: r.email,
          token: r.token,
          datasets: r.datasets
      });
     //console.log(user);
      return user;
}
