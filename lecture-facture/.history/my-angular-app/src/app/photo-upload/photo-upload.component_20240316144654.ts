import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photo-upload',
  //standalone: true,
  //imports: [],
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.css'
})
export class PhotoUploadComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('photo', this.selectedFile, this.selectedFile.name);
      this.http.post('http://your-backend-endpoint', formData).subscribe(res => {
        console.log(res);
        // Handle response as needed
      });
    }
  }
}
