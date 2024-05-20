import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { CaasService } from './core/services/caas.service';
import { DataService } from './core/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'readingBillsApp';
  extractedDataList: any[] = [];

  constructor(
    private caasService: CaasService,
    private dataService: DataService
  ) {}

  // Send file for data extraction on select file
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.extractData(file);
    }
  }

  // Extract data from file
  private extractData(file: File): void {
    this.caasService
      .requestDataFromAPI(file)
      .pipe(
        catchError((error) => {
          console.error('Error extracting CaaS response data:', error);
          throw error;
        })
      )
      .subscribe((response) => {
        const extractedData =
          this.caasService.extractDataFromResponse(response);
        this.saveExtractedData('extractedData', extractedData);
        console.log("Extracted data : ", extractedData);
      });
  }

  // Save extracted data from response
  private saveExtractedData(filename: string, data: any): void {
    this.dataService.saveData(filename, data).subscribe({
      next: (response) => {
        console.log('Data saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving data:', error);
      },
    });
  }

  // TESTING
  ngOnInit(): void {
    this.getExtractedData();
  }

  private getExtractedData(): void {
    this.dataService.getData().subscribe({
      next: (response) => {
        console.log('Retrieved data successfully:', response);
        this.extractedDataList = response;
      },
      error: (error) => {
        console.error('Error getting data:', error);
      },
    });
  }
}
