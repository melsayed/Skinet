import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../../shared/models/cart';
import { Product } from '../../shared/models/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseURL = environment.apiUrl;
  private http = inject(HttpClient);
  cart = signal<Cart | null>(null);
  /*
  computed = قيمة محسوبة بناء على signals أخرى.
يعني قيمة مش ثابتة…
بتتغير تلقائي لما الـ signals اللي معتمدة عليها تتغير.
ومفيش أي update أو set
الـ computed بتشتغل لوحدها.
  */
  itemsCount = computed(() => {
    /*
    reduce
    بتاخد مصفوفة وبترجع قيمة واحدة.
    هنا بنستخدمها عشان نحسب مجموع الكميات في عناصر العربة.
    1. المصفوفة اللي هنشتغل عليها: cart()?.items
    2. الدالة اللي هتنفذها على كل عنصر في المصفوفة:
       (sum, item) => sum + item.quantity
       - sum: المجموع الحالي (بيبدأ من القيمة الابتدائية اللي هنحددها في الخطوة الجاية)
       - item: العنصر الحالي في المصفوفة اللي بنشتغل عليه
    3. القيمة الابتدائية للمجموع: 0
    4. النتيجة النهائية: مجموع كميات كل العناصر في العربة
    5. لو العربة فاضية (null)، بنرجع 0 بدل ما نحاول نستخدم reduce على null.
    */
    return this.cart()?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  });

  orderTotal = computed(() => {
    return this.cart()?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
  })

  getCart(id: string) {
    return this.http.get<Cart>(this.baseURL + 'cart?id=' + id).pipe(
      map(cart => {
        this.cart.set(cart);
        return cart;
      })
    )
  }

  setCart(cart: Cart) {
    return this.http.post<Cart>(this.baseURL + 'cart', cart).subscribe({
      next: cart => this.cart.set(cart)
    })
  }
  deleteCart(id: string) {
    return this.http.delete(this.baseURL + 'cart?id=' + id).subscribe({
      next: () => this.cart.set(null)
    })
  }

  addItemToCart(item: CartItem | Product, quantity = 1) {
    const cart = this.cart() ?? this.createCart();
    if (this.isProduct(item))
      item = this.mapProductToCartItem(item);

    cart.items = this.AddOrUpdateItem(cart.items, item, quantity);
    this.setCart(cart);
  }

  private AddOrUpdateItem(items: CartItem[], item: CartItem, quantity: number): CartItem[] {
    const index = items.findIndex(x => x.productId == item.productId);
    if (index === -1) {
      item.quantity = quantity;
      items.push(item);
    }
    else
      items[index].quantity += quantity;

    return items;
  }

  private mapProductToCartItem(item: Product): CartItem {
    return {
      productId: item.id,
      productName: item.name,
      price: item.price,
      quantity: 1,
      pictureUrl: item.pictureUrl,
      brand: item.brand,
      type: item.type
    };
  }

  private isProduct(item: CartItem | Product): item is Product {
    return (item as Product).id !== undefined;
  }

  private createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }
}
