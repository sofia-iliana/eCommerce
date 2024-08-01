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
import { HttpClient } from '@angular/common/http';
import { BuyersInfoService } from '../BuyersInfo.service';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterModule, NgFor, CommonModule, NgClass],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  cartItems = inject(CartService).getCartItems();
  buyersInfo = inject(BuyersInfoService).buyersInfo;
  http = inject(HttpClient);
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
            this.loading = true;
            if (details.status === 'COMPLETED') {
              this.http.post("https://localhost:5001/api/order", {
                id: details.id,
                firstName: this.buyersInfo.firstName,
                lastName: this.buyersInfo.lastName,
                email: this.buyersInfo.email,
                mobile: this.buyersInfo.mobile,
                city: this.buyersInfo.city,
                country: this.buyersInfo.country,
                street: this.buyersInfo.street,
                streetNumber: this.buyersInfo.number,
                zip: this.buyersInfo.zip,
                comments: this.buyersInfo?.comments,
                dateOfOrder: new Date().toJSON(),
                orderItems: this.cartItems.map((item, index) => {
                  return ({ id: details.id + index, name: item.name, type: item.type, price: item.price, quantity: item.quantity })
                })
              }, { observe: 'response' }).subscribe({
                next: (response) => {
                  this.loading = false;
                  if (response.status == 200) {
                    console.log(response);
                    this.router.navigate(['/success']);
                  } else {
                    console.log(response)
                  }
                }
              })
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
