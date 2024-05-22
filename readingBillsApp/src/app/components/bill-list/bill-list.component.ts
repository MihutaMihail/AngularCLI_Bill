import { Component } from '@angular/core';
import { CaasService } from '../../core/services/caas.service';
import { DataService } from '../../core/services/data.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrl: './bill-list.component.scss',
})
export class BillListComponent {
  billList: any[] = [];

  constructor(
    private caasService: CaasService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.dataService.getData().subscribe({
      next: (response) => {
        console.log('Retrieved data successfully:', response);
        this.billList = response;
      },
      error: (error) => {
        console.error('Error getting data:', error);
      },
    });
  }

  // Extract data from file
  private extractData(file: File, fileName: string): void {
    this.caasService
      .requestDataFromAPI(file)
      .pipe(
        catchError((error) => {
          console.error('Error extracting CaaS response data:', error);
          throw error;
        })
      )
      .subscribe((response) => {
        const extractedData = this.caasService.extractDataFromResponse(
          this.generateId(this.billList),
          fileName,
          response
        );  
        this.saveExtractedData(extractedData);
        console.log('Extracted data : ', extractedData);
      });
  }

  // Save extracted data from response
  private saveExtractedData(data: any): void {
    this.dataService.saveData(data).subscribe({
      next: (response) => {
        console.log('Data saved successfully:', response);
        this.loadData();
      },
      error: (error) => {
        console.error('Error saving data:', error);
      },
    });
  }

  // Delete bill by its ID
  deleteBill(id: number): void {
    this.dataService.deleteData(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (error) => {
        console.error('Error deleting data:', error);
      },
    });
  }

  // Send file for data extraction on select file
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const name = this.stripFileExtension(file.name);
      this.extractData(file, name);
    }
  }

  private stripFileExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return fileName;
    return fileName.substring(0, lastDotIndex);
  }

  // Generate new id for json files
  private generateId(existingData: any[]): number {
    let maxId = 0;
    existingData.forEach((item) => {
      if (item.info.id > maxId) {
        maxId = item.info.id;
      }
    });
    return maxId + 1;
  }
}
