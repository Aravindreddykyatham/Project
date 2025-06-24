import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Cart } from '../interface/cart.interface';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject: BehaviorSubject<Cart>;

  public cart$: Observable<Cart>;

  constructor() {
    const productData = localStorage.getItem('cartDetails');
    const cart = productData
      ? JSON.parse(productData)
      : ({ items: [], totalPrice: 0 } as Cart);
    this.cartSubject = new BehaviorSubject<Cart>(cart);
    this.cart$ = this.cartSubject.asObservable();
  }

  setCart(cart: Cart) {
    localStorage.setItem('cartDetails', JSON.stringify(cart));
    cart.items = cart.items.filter((item) => {
      return item.quantity > 0;
    });
    cart.totalPrice = this.getCartTotal(cart);
    this.cartSubject.next(cart);
  }
  clearCart() {
    this.cartSubject.next({ items: [], totalPrice: 0 } as Cart);
  }
  getCart(): Cart {
    return this.cartSubject.value;
  }

  addTOCart(product: Product) {
    const currentCart = this.getCart();
    const producData = currentCart.items.find((item) => {
      return product.id === item.id;
    });
    if (producData) {
      producData.quantity += 1;
      this.setCart(currentCart);
    } else {
      currentCart.items.push(product);
      this.setCart(currentCart);
    }
  }
  increaseQuantity(product: Product) {
    const currentCart = this.getCart();
    const producData = currentCart.items.find((item) => {
      return product.id === item.id;
    });
    if (producData) {
      producData.quantity += 1;
      this.setCart(currentCart);
    }
  }

  decreaseQuantity(product: Product) {
    const currentCart = this.getCart();
    const producData = currentCart.items.find((item) => {
      return product.id === item.id;
    });
    if (producData) {
      producData.quantity -= 1;
      this.setCart(currentCart);
    }
  }

  getCartTotal(cart: Cart): number {
    let totalPrice = 0;

    cart.items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  }

  // totalPrice(){
  //   curr.forEach(element => {

  //   });
  // }
}
