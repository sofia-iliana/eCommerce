import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
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
  order: any;

  ngOnInit(): void {
    this.searchOrderForm = new FormGroup({
      orderId: new FormControl()
    })
  }

  searchOrder() {
    this.http.get("https://localhost:5001/api/order/" + this.searchOrderForm.value.orderId).subscribe({
      next: (response) => {
        this.order = response;
        console.log(this.order)
      },
      error: (error) => console.log(error),
    })
  }
}
