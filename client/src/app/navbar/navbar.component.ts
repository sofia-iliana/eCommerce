import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../Cart.service';
import { NgFor, CommonModule } from '@angular/common';
import { TeaItem } from '../teaItem';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgFor, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  cartService = inject(CartService);
  cartItems = this.cartService.getCartItems();
  showCart = false;
  openMenu = false;

  displayCartList() {
    console.log(this.cartService.getCartItems());
  }

  removeCartItem(id: number) {
    this.cartService.removeItem(id);
  }

  showCartItems() {
    this.showCart = !this.showCart;
  }

  onOpenMenu() {
    this.openMenu = !this.openMenu;
  }

  increaseAmount(item: TeaItem) {
    this.cartService.plusItem(item);
  }

  reduceAmount(item: TeaItem) {
    this.cartService.minusItem(item);
  }
}
