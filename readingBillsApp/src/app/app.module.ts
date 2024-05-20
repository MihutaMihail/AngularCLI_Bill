import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillComponent } from './components/bill/bill.component';
//import { BillDataService } from './core/services/bill-data.service';

@NgModule({
  declarations: [
    AppComponent,
    BillComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [/*BillDataService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
