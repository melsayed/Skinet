import { Component } from '@angular/core';
import { OrderSummaryComponent } from "../../shared/components/order-summary/order-summary.component";
import {MatStepper,MatStep} from '@angular/material/stepper';

@Component({
  selector: 'app-checkout',
  imports: [OrderSummaryComponent, MatStepper, MatStep],
  standalone : true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {

}
