import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { RequestDataApiService } from './core/services/request-data-api.service';
import { ExtractDataAPIService } from './core/services/extract-data-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'readingBillsApp';

  constructor(
    private requestService: RequestDataApiService,
    private extractService: ExtractDataAPIService,
  ) {}

  ngOnInit(): void {
    this.ExtractData('assets/DOM_FACTURE_ENERGIE_DUPONT.jpeg');
  }

  public ExtractData(filePath: string): void {
    this.requestService
      .RequestDataFromAPI(filePath)
      .pipe(
        catchError((error) => {
          console.error('Error extracting API data:', error);
          throw error;
        })
      )
      .subscribe((response) => {
        const extractedData = this.extractService.ExtractDataFromResponse(response);
        console.log('ExtractedData:', extractedData);
      });
  }
}
