import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-successful-transaction',
  standalone: true,
  imports: [],
  templateUrl: './successful-transaction.component.html',
  styleUrl: './successful-transaction.component.css',
})
export class SuccessfulTransactionComponent implements OnInit {
  cart = JSON.parse(localStorage['cart']);
  total = 0;

  ngOnInit(): void {
    this.getTotal();
    localStorage.clear();
  }

  getTotal() {
    this.cart.map((item: any) => {
      this.total = this.total + item.price * item.quantity;
    });
  }
}
