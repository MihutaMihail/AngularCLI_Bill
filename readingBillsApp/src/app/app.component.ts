import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { RequestDataApiService } from './core/services/request-data-api.service';
import { ExtractDataAPIService } from './core/services/extract-data-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'readingBillsApp';

  constructor(
    private requestService: RequestDataApiService,
    private extractService: ExtractDataAPIService,
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.ExtractData(file);
    }
  }

  public ExtractData(file: File): void {
    this.requestService
      .RequestDataFromAPI(file)
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
