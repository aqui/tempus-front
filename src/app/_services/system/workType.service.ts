import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { WorkType } from 'src/app/_models/WorkType';

@Injectable({
  providedIn: 'root'
})
export class WorkTypeService {

  private endpoint = 'http://localhost:8080/api/worktype/';

  constructor(private httpClient: HttpClient) { }

  getWorkTypeList(): Observable<any> {
    return this.httpClient.get(this.endpoint);
  } 

  getWorkType(id: number): Observable<any> {
    return this.httpClient.get(this.endpoint+`${id}`);
  }

  postWorkType(workType: WorkType): Observable<any> {
    return this.httpClient.post(this.endpoint, workType).pipe(retry(1), catchError(this.handleError));
  }

  putWorkType(workType: WorkType): Observable<any> {
    return this.httpClient.put(this.endpoint, workType).pipe(retry(1), catchError(this.handleError));
  }

  deleteWorkType(id: number): Observable<any> {
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
    workTypes: WorkType[];
  }
}