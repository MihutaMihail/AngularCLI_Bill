import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this line
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; // Add this line


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // And this line
    RouterModule.forRoot(routes) // Include routes here directly
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
