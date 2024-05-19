// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component'; // Import the new component
import { routes } from './app.routes'; // Import routes from app.routes.ts

@NgModule({
  declarations: [
    AppComponent,
    PhotoUploadComponent // Add the new component to declarations
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
