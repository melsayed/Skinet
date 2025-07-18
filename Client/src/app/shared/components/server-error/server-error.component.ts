import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
  error?: any;
  constructor(private router: Router) {
    const navigation = router.getCurrentNavigation();
    this.error = navigation?.extras.state?.["error"];
  }
}
