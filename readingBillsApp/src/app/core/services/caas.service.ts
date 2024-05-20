import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaasService {
  private caasEndpoint =
    'http://localhost:3000/api/v2/classify/DOM/identify/strategy/LOT_DOM?classifyAndRead=true';
  private caasKey = '552f9d7a-4517-45a3-a3de-5389228efbfd';

  constructor(private http: HttpClient) {}

  // Request data from file
  public requestDataFromAPI(file: Blob): Observable<any> {
    const headers = new HttpHeaders().set('X-Gravitee-Api-Key', this.caasKey);
    return this.http.post<any>(this.caasEndpoint, file, { headers });
  }

  // Load image file for API request
  /*private loadImageFileFromPath(filePath: string): Observable<Blob> {
    return this.http.get(filePath, { responseType: 'blob' }).pipe(
      catchError((error) => {
        console.error('Error loading image: file ', error);
        throw error;
      })
    );
  }*/

  // Extract necessary information from CaaS response
  public extractDataFromResponse(id: number, fileName: string, response: any): any {
    const document = response.documents[0];

    return {
      info: {
        id: id,
        fileName: fileName
      },
      pageIdList: document.pageIdList,
      classes: document.classes.map((c: any) => c.description),
      fieldValues: {
        DOCUMENT_DATE: this.getFieldValue(document, 'DOCUMENT_DATE'),
        FULL_NAME: this.getFieldValue(document, 'FULL_NAME'),
        POSTAL_ADDRESS: this.getFieldValue(document, 'POSTAL_ADDRESS'),
        STREET: this.getFieldValue(document, 'STREET'),
        ZIPCODE_AND_TOWN: this.getFieldValue(document, 'ZIPCODE_AND_TOWN'),
      },
    };
  }

  // Search inside an array to find a specific value
  private getFieldValue(document: any, code: any): string {
    const indexData = document.dataExtract.find(
      (data: any) => data.code === code
    );
    return indexData ? indexData.value : '';
  }
}
