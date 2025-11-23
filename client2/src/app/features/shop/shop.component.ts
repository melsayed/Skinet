import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import { MatCardModule } from '@angular/material/card';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatList, MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [MatCardModule, MatIcon, MatButton, ProductItemComponent, MatMenu, MatSelectionList, MatListOption, MatMenuTrigger, MatPaginator,FormsModule],
  "standalone": true,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  shopParams = new ShopParams();
  products?: Pagination<Product>;

  sortOptions = [
    { name: 'Alphabetical', value: 'Name' },
    { name: 'Price: Low to High', value: 'PriceAsc' },
    { name: 'Price: High to Low', value: 'PriceDesc' }
  ];

  pageSizeOptions = [5, 10, 15, 20];



  ngOnInit(): void {
    this.initalizeShop();
  }

  initalizeShop() {
    this.shopService.getTypes();
    this.shopService.getBrands();
    this.getProducts();
  }

  private getProducts() {
    this.shopService.getproducts(this.shopParams).subscribe(
      {
        next: response => {
          this.products = response;
        },
        error: error => {
          console.log(error);
        }
      }
    );
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shopParams.brands = result.selectedBrands;
        this.shopParams.types = result.selectedTypes;
        this.shopParams.pageNumber = 1;
        this.getProducts();
      }
    });
  }

  onSortSelected(event: MatSelectionListChange) {
    const selectedOption = event.options[0];

    if (selectedOption) {
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }
  }

  onSearchChange() {
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }
}