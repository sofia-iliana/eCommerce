import { Injectable } from '@angular/core';
import { TeaItem } from './teaItem';

@Injectable({ providedIn: 'root' })
export class CartService {
  addToCartList: TeaItem[] = [];
  total = 0;

  onAddToCart(item: TeaItem) {
    this.addToCartList.push(item);
    localStorage.setItem('cart', JSON.stringify(this.addToCartList));
  }

  getCartItems() {
    if (localStorage['cart']) {
      this.addToCartList = JSON.parse(localStorage['cart']);
    }
    return this.addToCartList;
  }

  removeItem(id: number) {
    let index = this.addToCartList.findIndex((item) => item.id === id);
    this.addToCartList.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.addToCartList));
  }

  plusItem(item: TeaItem) {
    if (item.quantity) {
      item.quantity++;
    }
    localStorage.setItem('cart', JSON.stringify(this.addToCartList));
  }

  minusItem(item: TeaItem) {
    if (item.quantity === 1) {
      this.removeItem(item.id);
    } else if (item.quantity) {
      --item.quantity;
    }
    localStorage.setItem('cart', JSON.stringify(this.addToCartList));
  }
}
