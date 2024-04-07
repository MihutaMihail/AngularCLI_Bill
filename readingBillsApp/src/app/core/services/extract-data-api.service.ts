import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExtractDataApiService {
  private caasEndpoint =
    'http://localhost:3000/api/v2/classify/DOM/identify/strategy/LOT_DOM?classifyAndRead=true';
  private apiKey = '552f9d7a-4517-45a3-a3de-5389228efbfd';

  constructor(private http: HttpClient) {}

  extractData(data: any): Observable<any> {
    const headers = {
      'X-Gravitee-Api-Key': this.apiKey,
    };

    return this.http.post<any>(this.caasEndpoint, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error('Internal Server Error'));
      })
    );
  }
}
