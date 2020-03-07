import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Holiday } from 'src/app/_models/Holiday';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry, mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private endpoint = 'http://localhost:8080/api/holiday/';

  constructor(private httpClient: HttpClient) { }

  getHolidayList(): Observable<any> {
    return this.httpClient.get(this.endpoint);
  } 

  getHoliday(id: number): Observable<any> {
    return this.httpClient.get(this.endpoint+`${id}`);
  }

  postHoliday(holiday: Holiday): Observable<any> {
    return this.httpClient.post(this.endpoint, holiday).pipe(retry(1), catchError(this.handleError));
  }

  putHoliday(holiday: Holiday): Observable<any> {
    return this.httpClient.put(this.endpoint, holiday).pipe(retry(1), catchError(this.handleError));
  }

  deleteHoliday(id: number): Observable<any> {
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
   holidays: Holiday[];
}