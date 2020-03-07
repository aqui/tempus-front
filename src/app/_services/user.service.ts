import { Injectable} from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId: string = jwt_decode(localStorage.getItem('access_token'))["id"];
  endpoint: string = 'http://localhost:8080';

  constructor(private http: HttpClient, public router: Router) { }

  getUser(): Observable<any> {
    let api = `${this.endpoint}/api/user/${this.userId}`;
    return this.http.get(api).pipe(map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
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
