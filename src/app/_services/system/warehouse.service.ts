import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { Warehouse } from 'src/app/_models/Warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private endpoint = 'http://localhost:8080/api/warehouses/';

  constructor(private httpClient: HttpClient) { }

  getWarehouseList(): Observable<Warehouse[]> {
    return this.httpClient.get<GetResponse>(this.endpoint).pipe(
      map(response => response._embedded.warehouses), catchError(this.handleError)
    );
  } 

  getWarehouse(id: number): Observable<Warehouse[]> {
    return this.httpClient.get<GetResponse>(this.endpoint+`${id}`).pipe(
      map(response => response._embedded.warehouses), catchError(this.handleError)
    );
  }

  postWarehouse(warehouse: Warehouse): Observable<any> {
    return this.httpClient.post(this.endpoint, warehouse).pipe(retry(1), catchError(this.handleError));
  }

  putWarehouse(warehouse: Warehouse): Observable<any> {
    return this.httpClient.put(this.endpoint+`${warehouse.id}`, warehouse).pipe(retry(1), catchError(this.handleError));
  }

  deleteWarehouse(id: number): Observable<any> {
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
    warehouses: Warehouse[];
  }
}