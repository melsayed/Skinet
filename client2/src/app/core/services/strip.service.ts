import { inject, Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeAddressElement, StripeAddressElementOptions, StripeElements } from "@stripe/stripe-js";
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { Cart } from '../../shared/models/cart';
import { firstValueFrom, map } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class StripService {
  baseUrl = environment.apiUrl + 'payments/';
  private cartService = inject(CartService);
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  private stripPromise: Promise<Stripe | null>;
  private elements?: StripeElements;
  private addressElement?: StripeAddressElement;

  constructor() {
    this.stripPromise = loadStripe(environment.stripePublicKey);
  }

  getStripeInstance() {
    return this.stripPromise;
  }

  async initializeElements() {
    if (!this.elements) {
      const stripe = await this.getStripeInstance();
      if (stripe) {
        const cart = await firstValueFrom(this.createOrUpdatePaymentIntent());
        this.elements = stripe.elements({ clientSecret: cart.clientSecret, appearance: { labels: 'floating' } });
      }
      else
        throw new Error("Stripe failed to load.");
    }
    return this.elements;
  }

  async createAddressElement() {
    if (!this.addressElement) {
      const elements = await this.initializeElements();
      if (elements) {
        const user = this.accountService.currentUser();
        let defaultValues: StripeAddressElementOptions["defaultValues"] = {};
        if (user)
          defaultValues.name = user.firstName + ' ' + user.lastName;

        if (user?.address) {
          defaultValues.address = {
            line1: user.address.line1,
            line2: user.address.line2,
            city: user.address.city,
            state: user.address.state,
            country: user.address.country,
            postal_code: user.address.postalCode
          }
        }
        const options: StripeAddressElementOptions = {
          mode: 'shipping', defaultValues
        };
        this.addressElement = elements.create('address', options);
      }
      else
        throw new Error("Elements instance has not been loaded")
    }
    return this.addressElement;
  }

  createOrUpdatePaymentIntent() {
    const cart = this.cartService.cart();
    if (!cart) throw new Error('Problem with Cart');
    return this.http.post<Cart>(this.baseUrl + cart.id, {}).pipe(
      map(cart => {
        this.cartService.cart.set(cart);
        return cart;
      })
    )
  }

  disposeElements() {
    this.addressElement = undefined;
    this.elements = undefined;
  }
}
