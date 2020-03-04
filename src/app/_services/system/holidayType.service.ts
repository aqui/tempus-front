import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { HolidayType } from 'src/app/_models/HolidayType';

@Injectable({
  providedIn: 'root'
})
export class HolidayTypeService {

  private endpoint = 'http://localhost:8080/api/holidayTypes/';

  constructor(private httpClient: HttpClient) { }

  getHolidayTypeList(): Observable<HolidayType[]> {
    return this.httpClient.get<GetResponse>(this.endpoint).pipe(
      map(response => response._embedded.holidayTypes), catchError(this.handleError)
    );
  } 

  getHolidayType(id: number): Observable<HolidayType[]> {
    return this.httpClient.get<GetResponse>(this.endpoint+`${id}`).pipe(
      map(response => response._embedded.holidayTypes), catchError(this.handleError)
    );
  }

  postHolidayType(holidayType: HolidayType): Observable<any> {
    return this.httpClient.post(this.endpoint, holidayType).pipe(retry(1), catchError(this.handleError));
  }

  putHolidayType(holidayType: HolidayType): Observable<any> {
    return this.httpClient.put(this.endpoint+`${holidayType.id}`, holidayType).pipe(retry(1), catchError(this.handleError));
  }

  deleteHolidayType(id: number): Observable<any> {
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
    holidayTypes: HolidayType[];
  }
}