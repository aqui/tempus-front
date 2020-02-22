import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../_models/user';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  endpoint: string = 'http://localhost:8080';
  clientUsername = 'tempus-trusted-client';
  clientSecret = 'tempussecretkey';
  headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Authorization': 'Basic ' + btoa(this.clientUsername + ':' + this.clientSecret) });
  options = { headers: this.headers };
  
  constructor(private http: HttpClient, public router: Router) {

  }

  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/oauth/token`, `grant_type=password&username=${user.username}&password=${user.password}`, this.options)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.access_token)
          this.router.navigate(['landing/']);
      })
  }

  decodeToken(): string {
    return jwt_decode(localStorage.getItem('access_token'));
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } 
    else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}