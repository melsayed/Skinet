import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrderSummaryComponent } from "../../shared/components/order-summary/order-summary.component";
import { MatStepper, MatStep, MatStepperNext } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { StripService } from '../../core/services/strip.service';
import { StripeAddressElement } from '@stripe/stripe-js';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-checkout',
  imports: [OrderSummaryComponent, MatStepper, MatStep, RouterLink, MatButton, MatStepperNext],
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit, OnDestroy {

  private stripeService = inject(StripService);
  private snackBar = inject(SnackbarService);
  addressElement?: StripeAddressElement;

  async ngOnInit() {
    try {
      this.addressElement = await this.stripeService.createAddressElement();
      this.addressElement.mount('#address-element');
    } catch (error: any) {
      this.snackBar.error(error.message || 'Failed to load address element. Please try again later.');
    }
  }

  ngOnDestroy(): void {
    this.stripeService.disposeElements();
  }
}
