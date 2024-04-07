import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { ExtractDataApiService } from './core/services/extract-data-api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'readingBillsApp';

  constructor(
    private extractionService: ExtractDataApiService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadImageFile('assets/DOM_FACTURE_ENERGIE_DUPONT.jpeg');
  }

  loadImageFile(filePath: string): void {
    this.http
      .get(filePath, { responseType: 'blob' })
      .pipe(
        catchError((error) => {
          console.error('Error loading image: file ', error);
          throw error;
        })
      )
      .subscribe((blob: Blob) => {
        this.extractData(blob);
      });
  }

  extractData(data: any): void {
    this.extractionService
      .extractData(data)
      .pipe(
        catchError((error) => {
          console.error('Error extracting API data:', error);
          throw error;
        })
      )
      .subscribe((response) => {
        console.log('Response:', response);
      });
  }
}
