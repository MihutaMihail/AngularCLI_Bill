import { Component, OnInit } from '@angular/core';
import { catchError, } from 'rxjs';
import { RequestDataApiService } from './core/services/request-data-api.service';
import { ExtractDataAPIService } from './core/services/extract-data-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'readingBillsApp';
  extractedDataList: any[] = [];

  constructor(
    private requestService: RequestDataApiService,
    private extractService: ExtractDataAPIService,
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log("on file selected");
      this.ExtractData(file);
    }
  }

  ngOnInit(): void {
    this.getExtractedData();
  }

  private getExtractedData(): void {
    this.requestService.getData().subscribe({
      next: (response) => {
        console.log('Data gotten successfully:', response);
        this.extractedDataList = response;
      },
      error: (error) => {
        console.error('Error getting data:', error);
      }
    });
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
        console.log("extracted data from response: ", extractedData);
        this.saveExtractedData('extractedData', extractedData);
      });
  }

  private saveExtractedData(filename: string, data: any): void {
    this.requestService.saveData(filename, data).subscribe({
      next: (response) => {
        console.log('Data saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving data:', error);
      }
    });
  }
}
