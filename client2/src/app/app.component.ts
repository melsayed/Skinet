import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  baseURL = "https://localhost:5001/api/";
  private http = inject(HttpClient);
  protected readonly title = 'Sico Shop';

  ngOnInit(): void {
    this.http.get(this.baseURL + 'products').subscribe(
      {
        next: data => {
          console.log(data);
        },
        error: error => {
          console.log(error);
        },
        complete: () => console.log('Request completed')
      }
    );
  }
}
