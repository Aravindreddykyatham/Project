import { Component } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Product } from '../../shared/interface/product.interface';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../shared/interface/cart.interface';
import { CartService } from '../../shared/services/cart.service';
import { PlaceOrderRequest } from '../../shared/interface/placeOrderRequest.interface';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interface/user.interface';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss',
})
export class PlaceOrderComponent {
  product!: Product;
  cart!: Cart;
  user!: User | null;

  fromCart = true;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService
  ) {
    activatedRoute.queryParamMap.subscribe((quaryParams) => {
      if (quaryParams.has('fromCart')) {
        this.fromCart = true;
        cartService.cart$.subscribe((cart) => {
          this.cart = cart;
          console.log(cart);
        });
      } else {
        this.orderService.product$.subscribe((productDetails) => {
          this.product = productDetails;
        });
      }
    });
  }
  ngOnInit() {
    this.user = this.userService.getUser();
  }

  placeOrder() {
    if (!this.user) {
      return;
    }
    const order: PlaceOrderRequest = {
      userId: this.user.id,
      orderItems: [],
    };

    if (this.fromCart) {
      for (let item of this.cart.items) {
        order.orderItems.push({ quantity: item.quantity, productId: item.id });
      }
    } else {
      order.orderItems.push({
        productId: this.product.id,
        quantity: this.product.quantity,
      });
    }
    this.orderService.placeOrder(order).subscribe(console.log);
  }
}
