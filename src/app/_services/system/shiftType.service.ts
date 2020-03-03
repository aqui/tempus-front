import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { ShiftType } from 'src/app/_models/ShiftType';

@Injectable({
  providedIn: 'root'
})
export class ShiftTypeService {

  private endpoint = 'http://localhost:8080/api/shiftTypes/';

  constructor(private httpClient: HttpClient) { }

  getShiftTypeList(): Observable<ShiftType[]> {
    return this.httpClient.get<GetResponse>(this.endpoint).pipe(
      map(response => response._embedded.shiftTypes), catchError(this.handleError)
    );
  } 

  getShiftType(id: number): Observable<ShiftType[]> {
    return this.httpClient.get<GetResponse>(this.endpoint+`${id}`).pipe(
      map(response => response._embedded.shiftTypes), catchError(this.handleError)
    );
  }

  postShiftType(shiftType: ShiftType): Observable<any> {
    return this.httpClient.post(this.endpoint, shiftType).pipe(retry(1), catchError(this.handleError));
  }

  putShiftType(shiftType: ShiftType): Observable<any> {
    return this.httpClient.put(this.endpoint+`${shiftType.id}`, shiftType).pipe(retry(1), catchError(this.handleError));
  }

  deleteShiftType(id: number): Observable<any> {
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
    shiftTypes: ShiftType[];
  }
}