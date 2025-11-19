import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseURL = "https://localhost:5001/api/";
  private http = inject(HttpClient);
  types: string[] = [];
  brands: string[] = [];

  getproducts() {
    return this.http.get<Pagination<Product>>(this.baseURL + 'products?pageSize=20');
  }

  getTypes() {
    if (this.types.length > 0) return;
    return this.http.get<string[]>(this.baseURL + 'products/types').subscribe(response => {
      this.types = response;
    });
  }

  getBrands() {
    if (this.brands.length > 0) return;
    return this.http.get<string[]>(this.baseURL + 'products/brands').subscribe(response => {
      this.brands = response;
    });
  }
}
