import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestDataApiService {
  private caasEndpoint =
    'http://localhost:3000/api/v2/classify/DOM/identify/strategy/LOT_DOM?classifyAndRead=true';
  private apiKey = '552f9d7a-4517-45a3-a3de-5389228efbfd';
  private apiUrl = 'http://localhost:3000/json';

  constructor(private http: HttpClient) {}

  // POST request to get data from the file
  public RequestDataFromAPI(file: Blob): Observable<any> {
    const headers = {
      'X-Gravitee-Api-Key': this.apiKey,
    };

    return this.http.post<any>(this.caasEndpoint, file, { headers });
  }

  saveData(filename: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveData`, { filename, data });
  }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getData`);
  }

  // // Function to get all JSON data from the server
  // public getDataFromServer(): Observable<any> {
  //   return this.http.get<any>('http://localhost:3000/json/getData');
  // }
  
  //
  // If needed to send a file path instead of the file itself,
  // use the functions below
  //

  // POST request to get data from the file
  /*public RequestDataFromAPI(filePath: string): Observable<any> {
    return this.loadImageFileFromPath(filePath).pipe(
      switchMap((blob: Blob) => {
        const headers = {
          'X-Gravitee-Api-Key': this.apiKey,
        };
        return this.http.post<any>(this.caasEndpoint, blob, { headers });
      })
    );
  }

  // Load image file for API request
  private loadImageFileFromPath(filePath: string): Observable<Blob> {
    return this.http.get(filePath, { responseType: 'blob' }).pipe(
      catchError((error) => {
        console.error('Error loading image: file ', error);
        throw error;
      })
    );
  }*/
}
