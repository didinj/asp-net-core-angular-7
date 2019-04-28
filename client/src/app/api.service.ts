import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Supplier } from './supplier';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:5000/api/Supplier';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getSuppliers (): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(apiUrl, httpOptions)
      .pipe(
        tap(heroes => console.log('fetched Suppliers')),
        catchError(this.handleError('getSuppliers', []))
      );
  }

  getSupplier(id: number): Observable<Supplier> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Supplier>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched Supplier id=${id}`)),
      catchError(this.handleError<Supplier>(`getSupplier id=${id}`))
    );
  }

  addSupplier (supplier: any): Observable<Supplier> {
    return this.http.post<Supplier>(apiUrl, supplier, httpOptions).pipe(
      tap((supplierRes: Supplier) => console.log(`added Supplier w/ id=${supplierRes.supplierId}`)),
      catchError(this.handleError<Supplier>('addSupplier'))
    );
  }

  updateSupplier (id: number, supplier: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, supplier, httpOptions).pipe(
      tap(_ => console.log(`updated Supplier id=${id}`)),
      catchError(this.handleError<any>('updateSupplier'))
    );
  }

  deleteSupplier (id: number): Observable<Supplier> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Supplier>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Supplier id=${id}`)),
      catchError(this.handleError<Supplier>('deleteSupplier'))
    );
  }
}
