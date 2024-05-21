import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './components/bill/bill.component';
import { BillListComponent } from './components/bill-list/bill-list.component';

const routes: Routes = [
  { path: '', component: BillListComponent},
  { path: 'data/:id', component: BillComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
