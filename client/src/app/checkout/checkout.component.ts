import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../Cart.service';
import { NgFor, CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TeaItem } from '../teaItem';
import { BuyersInfoService, Info } from '../BuyersInfo.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterModule,
    NgFor,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  infoService = inject(BuyersInfoService);
  cartItems = this.cartService.getCartItems();
  total = 0;
  registerForm: FormGroup = new FormGroup({});

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      comments: new FormControl(),
    });
  }

  ngDoCheck() {
    this.total = 0;
    this.getTotal();
  }

  increaseAmount(item: TeaItem) {
    this.cartService.plusItem(item);
  }

  reduceAmount(item: TeaItem) {
    this.cartService.minusItem(item);
  }

  removeCartItem(id: number) {
    this.cartService.removeItem(id);
  }

  getTotal() {
    this.cartItems.map((item: TeaItem) => {
      if (item.quantity) this.total = this.total + item.price * item.quantity;
    });
    return this.total;
  }

  register() {
    this.infoService.getBuyersInfo(this.registerForm.value as Info);
    if (this.registerForm.status === 'VALID') {
      this.router.navigate(['/payment']);
    }
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
