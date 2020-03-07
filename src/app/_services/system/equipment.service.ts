import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Equipment } from 'src/app/_models/Equipment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private endpoint = 'http://localhost:8080/api/equipment/';

  constructor(private httpClient: HttpClient) { }

  getEquipmentList(): Observable<any> {
    return this.httpClient.get(this.endpoint);
  } 

  getEquipment(id: number): Observable<any> {
    return this.httpClient.get(this.endpoint+`${id}`);
  }

  postEquipment(equipment: Equipment): Observable<any> {
    return this.httpClient.post(this.endpoint, equipment).pipe(retry(1), catchError(this.handleError));
  }

  putEquipment(equipment: Equipment): Observable<any> {
    return this.httpClient.put(this.endpoint, equipment).pipe(retry(1), catchError(this.handleError));
  }

  deleteEquipment(id: number): Observable<any> {
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