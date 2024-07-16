import { Component, inject, OnInit } from '@angular/core';
import { BuyersInfoService } from '../BuyersInfo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-successful-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './successful-transaction.component.html',
  styleUrl: './successful-transaction.component.css',
})
export class SuccessfulTransactionComponent implements OnInit {
  info = inject(BuyersInfoService).buyersInfo;
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
