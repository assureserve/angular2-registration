import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Registration} from "../registration/registration.model";
import {User} from "../models/user.model";

@Injectable()
export class AuthenticationService {
  userMap: {[key: string]: User} = {};
private baseUrl: string = 'http://localhost:8080/hello';
constructor(private http: Http) { }

  register(user: User): boolean {
    console.log("Auth service register...");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({email: user.email, password: user.password, firstName: user.firstName, lastName: user.lastName});

    this.http.post('http://localhost:8080/register', body, { headers: this.getPostHeaders() })
                  .map((res: Response) => res.json()).subscribe();
    localStorage.setItem('currentUser', JSON.stringify(user));
      //JSON.stringify({email: user.email, password: user.password, firstName: user.firstName, lastName: user.lastName}))
      //.map((response: Response) => {
      //  console.log(response.json())
      //}).subscribe();
    return true;
  }

  register2(user: User) {
    this.userMap[user.email] = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    //return false;
  }

  logout() {
    this.userMap = {};
    localStorage.removeItem('currentUser');
  }

  login(userName: string, password: string): Observable<User> {
    console.log("Auth service login...");

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({email: userName, password: password});

    return this.http.post('http://localhost:8080/login', body, { headers: this.getPostHeaders() })
                  .map(res => res.json());
                  
    
    //return true;

    //let tst = this.http
    //.get('http://localhost:8080/persons/1', {headers: this.getHeaders()}).map(this.getResponse).subscribe();
    //.catch(handleError);

    //return people$;
  }

  private mapUser(response: Response) {
    console.log("mapUser");
    response.json().map(this.toUser);
  }

  private toUser(r: any): User{
    console.log("toUser");
    let user = <User>({
      email: r.email,
      firstName: r.firstName,
      lastName: r.lastName
    });

    console.log(user);
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  }

private getResponse(response: Response) {
  console.log(response.json());
}



  login2(userName: string, password: string) {
    console.log(userName);
    return this.http.post('/api/authenticate', JSON.stringify({ userName: userName, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  private getPostHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}



function mapPersons(response:Response): String {
console.log("!!!!!!!");
console.log(response);
console.log(response.json());
return "";
}

function handleError (error: any) {
}
