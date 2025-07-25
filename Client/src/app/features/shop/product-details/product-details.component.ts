import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe,MatIconModule,MatButtonModule,MatFormFieldModule,MatLabel,MatDividerModule,MatInputModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  product?: Product;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;

    this.shopService.getProduct(+id).subscribe({
      next: response => this.product = response,
      error: error => console.log(error)
    });
  }

}
