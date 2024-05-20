import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss',
})
export class BillComponent {
  billData: any;

  constructor() {}

  /*ngOnInit(): void {
    this.fetchBillData();
  }

  fetchBillData(): void {
    this.billDataService.getBillData().pipe(
      catchError(error => {
        console.error('Error fetching bill data:', error);
        throw error;
      })
    ).subscribe(
      (data) => {
        this.billData = data;
      }
    );
  }*/
}
