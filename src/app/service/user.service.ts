import { User } from '../user';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private baseUrl: string = 'localhost:8080/authenticate';

  constructor(private http : Http){
  }

  getAuthenticatedUser(username: string, password: string): Observable<User> {
    let user$ = this.http
      .get(this.baseUrl, {headers: this.getHeaders()}).map(mapUsers);
      return user$;
  }

  private getHeaders(): Headers{
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}


function mapUsers(response:Response): User {
   // The response of the API has a results
   // property with the actual results
     return response.json().user.map(toUser)
  }

 function toUser(r: any): User {
      console.log(r);
      let user = <User>({
          name: r.name,
          username: r.username,
          token: r.token,
          datasets: r.datasets
      });
      return user;
}
