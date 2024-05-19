import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes'; // Import routes from app.routes.ts
import { PhotoUploadComponent } from './photo-upload/photo-upload.component'; // Import the PhotoUploadComponent

@NgModule({
  declarations: [
    AppComponent,
    PhotoUploadComponent // Add the PhotoUploadComponent to the declarations
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes) // Use routes from app.routes.ts
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
