import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
    
  endpoint: string = 'http://localhost:8080';

  constructor(private http: HttpClient, public router: Router) { }

  getCompany(): Observable<any> {
    let api = `${this.endpoint}/api/companies/`;
    return this.http.get(api).pipe(map((response: Response) => { return response || {} }), catchError(this.handleError))
  }

  postImage(uploadImageData: FormData): Observable<any> {
    let api = `${this.endpoint}/api/fileupload/companylogo`;
    return this.http.post(api, uploadImageData, { observe: 'response' }).pipe(retry(1), catchError(this.handleError))
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
