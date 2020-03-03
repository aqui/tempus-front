import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Duty } from 'src/app/_models/duty';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DutyService {

  private endpoint = 'http://localhost:8080/api/duties/';

  constructor(private httpClient: HttpClient) { }

  getDutyList(): Observable<Duty[]> {
    return this.httpClient.get<GetResponse>(this.endpoint).pipe(
      map(response => response._embedded.duties), catchError(this.handleError)
    );
  } 

  getDuty(id: number): Observable<Duty[]> {
    return this.httpClient.get<GetResponse>(this.endpoint+`${id}`).pipe(
      map(response => response._embedded.duties), catchError(this.handleError)
    );
  }

  postDuty(duty: Duty): Observable<any> {
    return this.httpClient.post(this.endpoint, duty).pipe(retry(1), catchError(this.handleError));
  }

  putDuty(duty: Duty): Observable<any> {
    return this.httpClient.put(this.endpoint+`${duty.id}`, duty).pipe(retry(1), catchError(this.handleError));
  }

  deleteDuty(id: number): Observable<any> {
    return this.httpClient.delete(this.endpoint+`${id}`).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.log(error)
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

interface GetResponse {
  _embedded: {
    duties: Duty[];
  }
}