// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule

import { AppComponent } from './app.component';
import { routes } from './app.routes'; // Import routes from app.routes.ts

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), // Set up your routes here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
