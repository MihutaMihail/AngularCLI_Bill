import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillComponent } from './components/bill/bill.component';
import { BillListComponent } from './components/bill-list/bill-list.component';
import { SwaggerComponent } from './components/swagger/swagger.component';
//import { BillDataService } from './core/services/bill-data.service';

@NgModule({
  declarations: [
    AppComponent,
    BillComponent,
    BillListComponent,
    SwaggerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [/*BillDataService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
