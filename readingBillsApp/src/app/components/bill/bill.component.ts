import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss',
})
export class BillComponent implements OnInit {
  billData: any;
  editing: any = {}; // Track editing state for each field
  editedValues: any = {}; // Store temporary edited values
  private dataId: number = -1;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.dataId = Number(id);
        this.fetchBillDataById(this.dataId);
      } else {
        this.dataId = -1;
      }
    });
  }

  private fetchBillDataById(id: number): void {
    this.dataService.getDataById(id).subscribe({
      next: (response) => {
        this.billData = response;
      },
      error: (error) => {
        console.error('Error getting data by ID:', error);
      },
    });
  }

  private updateBillDataField(id:number, field: string, newValue: string): void {
    this.dataService.updateDataField(id, field, newValue).subscribe({
      next: () => {
        this.fetchBillDataById(id);
      },
      error: (error) => {
        console.error('Error updating field', error);
      }
    });
  }

  toggleEdit(key: string) {
    this.editing[key] = !this.editing[key];
    if (this.editing[key]) {
      this.editedValues[key] = this.billData.fieldValues[key];
    } else {
      this.editedValues[key] = null;
    }
  }

  confirmEdit(key: string) {
    if (this.editedValues[key] !== undefined) {
      this.updateBillDataField(this.dataId, key, this.editedValues[key]);
      this.editing[key] = false;
    }
  }

  // Return keys of an object
  // In our case, is used to iterate over each key inside the json object
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
