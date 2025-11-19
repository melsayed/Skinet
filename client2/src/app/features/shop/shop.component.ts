import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import { MatCardModule } from '@angular/material/card';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';

@Component({
  selector: 'app-shop',
  imports: [MatCardModule, MatIcon, MatButton, ProductItemComponent],
  "standalone": true,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);

  products: Product[] = [];

  ngOnInit(): void {
    this.initalizeShop();
  }

  initalizeShop() {
    this.shopService.getTypes();
    this.shopService.getBrands();
    this.shopService.getproducts().subscribe(
      {
        next: response => {
          this.products = response.data;
        },
        error: error => {
          console.log(error);
        }
      }
    );
  }

  openFiltersDialog() {
    this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px'
    })
  }
}
