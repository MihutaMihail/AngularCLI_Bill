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

  // Call GET / endpoint
  public getData(): Observable<any> {
    return this.http.get(`${this.dataEndpoint}/`);
  }

  // Call GET /:id endpoint
  public getDataById(id: number): Observable<any> {
    return this.http.get(`${this.dataEndpoint}/${id}`)
  }

  // Call POST /save endpoint
  public saveData(data: any): Observable<any> {
    const id = data.info.id;
    const body = {
      data,
      id
    };

    const headers = new HttpHeaders().set('X-Secret-Key', this.dataKey);
    return this.http.post(`${this.dataEndpoint}/save`, body, { headers });
  }

  // Call DELETE /:id endpoint
  public deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.dataEndpoint}/${id}`)
  }
}
