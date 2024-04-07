import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestDataApiService {
  private caasEndpoint =
    'http://localhost:3000/api/v2/classify/DOM/identify/strategy/LOT_DOM?classifyAndRead=true';
  private apiKey = '552f9d7a-4517-45a3-a3de-5389228efbfd';

  constructor(private http: HttpClient) {}

  // POST request to get data from image file
  public RequestDataFromAPI(filePath: string): Observable<any> {
    return this.loadImageFile(filePath).pipe(
      switchMap((blob: Blob) => {
        const headers = {
          'X-Gravitee-Api-Key': this.apiKey,
        };
        return this.http.post<any>(this.caasEndpoint, blob, { headers });
      })
    );
  }

  // Load image file for API request
  private loadImageFile(filePath: string): Observable<Blob> {
    return this.http.get(filePath, { responseType: 'blob' }).pipe(
      catchError((error) => {
        console.error('Error loading image: file ', error);
        throw error;
      })
    );
  }
}
