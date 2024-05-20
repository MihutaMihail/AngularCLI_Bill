import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataEndpoint = 'http://localhost:3000/data';  
  private dataKey = 'd1sq3d5z1q-qh14jkh57-z140h335gs';

  constructor(private http: HttpClient) {}

  // Call POST /save endpoint
  public saveData(data: any): Observable<any> {
    const fileName = data.info.fileName;
    const body = {
      data,
      fileName
    };

    const headers = new HttpHeaders().set('X-Secret-Key', this.dataKey);
    return this.http.post(`${this.dataEndpoint}/save`, body, { headers });
  }

  // Call GET / endpoint
  public getData(): Observable<any> {
    return this.http.get(`${this.dataEndpoint}/`);
  }
}
