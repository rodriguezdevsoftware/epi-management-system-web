import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CompaniesResponse, CompanyResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly API_URL = `${environment.apiUrl}/companies`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<CompaniesResponse> {
    return this.http.get<CompaniesResponse>(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro inesperado';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      if (error.error && error.error.error) {
        errorMessage = error.error.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
