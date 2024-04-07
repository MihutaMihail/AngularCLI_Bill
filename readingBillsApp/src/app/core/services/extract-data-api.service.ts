import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtractDataAPIService {

  constructor() { }

  // Extract necessary information from API response
  public ExtractDataFromResponse(response: any): any {
    const document = response.documents[0];
    
    return {
      pageIdList: document.pageIdList,
      classes: document.classes.map((c: any) => c.description),
      fieldValues: {
        DOCUMENT_DATE: this.getFieldValue(document, 'DOCUMENT_DATE'),
        FULL_NAME: this.getFieldValue(document, 'FULL_NAME'),
        POSTAL_ADDRESS: this.getFieldValue(document, 'POSTAL_ADDRESS'),
        STREET: this.getFieldValue(document, 'STREET'),
        ZIPCODE_AND_TOWN: this.getFieldValue(document, 'ZIPCODE_AND_TOWN')
      }
    };
  }
  
  // Search inside an array to find a specific value
  private getFieldValue(document: any, code: any): string {
    const indexData = document.dataExtract.find((data: any) => data.code === code);
    return indexData ? indexData.value : '';
  }
}
