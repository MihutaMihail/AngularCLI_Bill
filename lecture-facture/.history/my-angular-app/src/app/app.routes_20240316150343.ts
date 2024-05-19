// app.routes.ts

import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'photo-upload', component: PhotoUploadComponent },
  // Add more routes as needed
];
