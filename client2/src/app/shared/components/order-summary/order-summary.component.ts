import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';
import { CurrencyPipe, Location } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  imports: [CurrencyPipe,RouterLink, MatButton, MatFormField, MatLabel,MatInput],
  standalone: true,
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  cartService = inject(CartService);
  location = inject(Location);
}
