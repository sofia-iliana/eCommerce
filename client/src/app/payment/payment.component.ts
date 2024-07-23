import { NgFor, CommonModule, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../Cart.service';
import { TeaItem } from '../teaItem';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterModule, NgFor, CommonModule, NgClass],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  cartService = inject(CartService);
  cartItems = this.cartService.getCartItems();
  total = 0;
  loading = false;
  containerClass = 'w-full bg-beige flex flex-col items-center';
  loadingClass = 'w-full bg-beige flex flex-col items-center opacity-30';

  constructor(private router: Router) { }

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  ngOnInit() {
    this.total = 0;
    this.getTotal();
    window.paypal
      .Buttons({
        style: {
          color: 'white',
          layout: 'vertical',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.total.toString(),
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log(details);
            if (details.status === 'COMPLETED') {
              this.router.navigate(['/success']);
            }
          });
        },
        onError: (error: any) => {
          this.loading = false;
          console.log(error);
        },
      })
      .render(this.paymentRef.nativeElement);
  }

  getTotal() {
    this.cartItems.map((item: TeaItem) => {
      if (item.quantity) this.total = this.total + item.price * item.quantity;
    });
    return this.total;
  }
}
