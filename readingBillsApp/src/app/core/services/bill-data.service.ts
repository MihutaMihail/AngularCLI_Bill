import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillDataService {
  private jsonUrl = 'assets/data.json';

  // The json object is a resource and HttpClient is needed to fetch that
  constructor(private http: HttpClient) { }

  // Using HttpClient to fetch a resource, returns an 'Observable' object 
  // which are used to handle asynchronous operations
  getBillData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
