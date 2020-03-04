import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Holiday } from 'src/app/_models/Holiday';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { HolidayType } from 'src/app/_models/HolidayType';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private endpoint = 'http://localhost:8080/api/holidays/';

  constructor(private httpClient: HttpClient) { }

  getHolidayList(): Observable<Holiday[]> {
    return this.httpClient.get<GetResponse>(this.endpoint).pipe(map(response => response._embedded.holidays), catchError(this.handleError));
  } 

  getHoliday(id: number): Observable<Holiday[]> {
    return this.httpClient.get<GetResponse>(this.endpoint+`${id}`).pipe(
      map(response => response._embedded.holidays), catchError(this.handleError)
    );
  }

  getHolidayType(id: number) {
    return this.httpClient.get(this.endpoint+`${id}`+"/holidayType");
  }

  postHoliday(holiday: Holiday): Observable<any> {
    return this.httpClient.post(this.endpoint, holiday).pipe(retry(1), catchError(this.handleError));
  }

  putHoliday(holiday: Holiday): Observable<any> {
    return this.httpClient.put(this.endpoint+`${holiday.id}`, holiday).pipe(retry(1), catchError(this.handleError));
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
  _embedded: {
    holidays: Holiday[];
  }
}