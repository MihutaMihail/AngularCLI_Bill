import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.selectedFile = file ? file : this.selectedFile;
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('photo', this.selectedFile, this.selectedFile.name);
      this.http.post('http://your-backend-endpoint', formData).subscribe(res => {
        console.log(res);
      });
    }
  }
}
