import { User } from '../user';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private baseUrl: string = 'http://localhost:8080/authenticate';

  constructor(private http : Http){
      this.http = http;
  }

  getAuthenticatedUser(username: string, password: string): Observable<User> {
    //console.log(this.baseUrl);
    const body = {
        'username': username,
        'password': password
    };
    return this.http.post(this.baseUrl, body,
                new RequestOptions({headers: this.getHeaders()}))
        .map(response => mapUsers(response))
        //.catch(error => { console.log(JSON.stringify(error.json())); } );
  }

  private getHeaders(): Headers{
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    let headers = new Headers();
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
      let user = <User>({
          name: r.name,
          username: r.username,
          token: r.token,
          datasets: r.datasets
      });
     console.log(user);
      return user;
}
