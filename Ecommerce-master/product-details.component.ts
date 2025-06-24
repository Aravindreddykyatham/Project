import { Component } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/interface/product.interface';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../shared/services/order.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { addToCart } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  id: number | null = null;
  product: Product = {} as Product;
  productTOBuy: Product | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private toast: ToastrService,
    private orderService: OrderService,
    private store: Store<AppState>
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.productService.getProductById(this.id).subscribe((product) => {
        this.product = product;
      });
    }
  }

  getImage(img: String): String {
    return `data:image/png;base64,${img}`;
  }

  goback() {
    this.router.navigate([`home`]);
  }

  addtoCart() {
    const product: Product = {
      ...this.product,
      quantity: 1,
      availableQuantity: this.product.quantity,
    };
    this.store.dispatch(addToCart({ product }));
    //console.log(this.product);

    this.cartService.addTOCart(product);
    this.toast.success('added to cart');
    //this.router.navigate([`cart`]);
  }

  buyNow() {
    this.orderService.buyNow(this.product);
    this.router.navigate([`buy-now`]);
  }
}
