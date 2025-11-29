import { CurrencyPipe } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { CartItem } from '../../../shared/models/cart';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe,RouterLink,MatIcon,MatButton],
  standalone: true,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  //@Input() item?: CartItem;
  item = input.required<CartItem>();
}
