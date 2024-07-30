import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../Order'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  searchOrderForm: FormGroup = new FormGroup({});
  http = inject(HttpClient);
  currentDate = new Date();
  orderDate: any;
  formattedDate = "";
  estimatedDelivery = "";
  orderStatus = "";
  selectedClass = "w-7 h-7 border-green bg-green text-light rounded-full flex items-center justify-center";
  unselectedClass = "w-7 h-7 border-green text-green rounded-full flex items-center justify-center"
  order: Order = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    street: '',
    streetNumber: '',
    zip: '',
    city: '',
    country: '',
    dateOfOrder: '',
    orderItems: []
  }

  ngOnInit(): void {
    this.searchOrderForm = new FormGroup({
      orderId: new FormControl()
    })
  }

  searchOrder() {
    this.http.get("https://localhost:5001/api/order/" + this.searchOrderForm.value.orderId).subscribe({
      next: (response) => {
        this.order = response as Order;
        let parse = Date.parse(this.order.dateOfOrder);
        let localEstimated = new Date(parse);
        let localShipping = new Date(parse);
        localShipping.setDate(localShipping.getDate() + 2);
        localEstimated.setDate(localEstimated.getDate() + 5);
        this.orderDate = new Date(parse);
        this.formattedDate = this.orderDate.getDate() + '/' + this.orderDate.getMonth() + '/' + this.orderDate.getFullYear();
        this.estimatedDelivery = (localEstimated.getDate()) + '/' + localEstimated.getMonth() + '/' + localEstimated.getFullYear();
        if (this.currentDate >= localShipping) {
          this.orderStatus = "shipping";
        } else if (this.currentDate >= localEstimated) {
          this.orderStatus = "delivery";
        }
        console.log(this.orderStatus);
      },
      error: (error) => console.log(error),
    })
  }
}
