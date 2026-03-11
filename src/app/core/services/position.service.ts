import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PositionsResponse, PositionResponse, PositionPayload } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private readonly API_URL = `${environment.apiUrl}/positions`;

  constructor(private http: HttpClient) { }

  getAll(companyId?: string): Observable<PositionsResponse> {
    let params = new HttpParams();
    if (companyId) {
      params = params.set('companyId', companyId);
    }
    
    return this.http.get<PositionsResponse>(this.API_URL, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<PositionResponse> {
    return this.http.get<PositionResponse>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(payload: PositionPayload): Observable<PositionResponse> {
    return this.http.post<PositionResponse>(this.API_URL, payload).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, payload: PositionPayload): Observable<PositionResponse> {
    return this.http.put<PositionResponse>(`${this.API_URL}/${id}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.API_URL}/${id}`).pipe(
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
