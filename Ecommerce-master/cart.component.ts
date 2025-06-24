import { Component } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Cart } from '../../shared/interface/cart.interface';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../shared/interface/product.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectCart } from '../../store/cart/cart.selectors';
import { increment } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart$!: Observable<Cart>;
  cartSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private store: Store<AppState>
  ) {
    // this.cartSubscription = cartService.cart$.subscribe((data) => {
    //   this.cart = data;
    //data.totalPrice = 123;
    // console.log(this.cart);
    // console.log(this.cart.items.length);
    // });
    // this.cartTotal = cartService.getCartTotal;
  }

  ngOnInit() {
    this.cart$ = this.store.select(selectCart);
  }

  increaseQuantity(product: Product) {
    // this.cartService.increaseQuantity(product);
    if (product.availableQuantity > product.quantity) {
      this.store.dispatch(increment({ productId: product.id }));
    }
  }

  decreaseQuantity(product: Product) {
    this.cartService.decreaseQuantity(product);
  }

  // ngOnDestroy() {
  //   this.cartSubscription.unsubscribe();
  // }
  buyNow() {
    this.router.navigate([`buy-now`], { queryParams: { fromCart: true } });
  }
}
