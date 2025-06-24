import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interface/product.interface';
import { Cart } from '../interface/cart.interface';
import { PlaceOrderRequest } from '../interface/placeOrderRequest.interface';
import { HttpClient } from '@angular/common/http';
import { UserOrder, UserOrderItems } from '../interface/userOrders.interface';
import { UpdateStatus } from '../interface/UpdateStatus.intercface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/order';
  private orderItemApiUrl = 'http://localhost:8080/api/order-items';
  private productSubject: BehaviorSubject<Product>;

  public product$: Observable<Product>;

  constructor(private http: HttpClient) {
    const productData = localStorage.getItem('productDetails');
    const product = productData ? JSON.parse(productData) : null;
    this.productSubject = new BehaviorSubject<Product>(product);
    this.product$ = this.productSubject.asObservable();
  }

  setProduct(product: Product) {
    localStorage.setItem('productDetails', JSON.stringify(product));
    this.productSubject.next(product);
  }
  getProduct(): Product | null {
    return this.productSubject.value;
  }

  buyNow(product: Product) {
    this.setProduct({ ...product, quantity: 1 });
    return product.id;
  }

  placeOrder(order: PlaceOrderRequest) {
    return this.http.post(
      `${this.apiUrl}/placeOrder`,
      order
    ) as Observable<Product>;
  }

  getUserOrders(userId: number) {
    return this.http.get(`${this.apiUrl}/user-orders/${userId}`) as Observable<
      Array<UserOrder>
    >;
  }
  getSellerOrders(userId: number) {
    return this.http.get(
      `${this.orderItemApiUrl}/seller/${userId}`
    ) as Observable<Array<UserOrderItems>>;
  }

  chaneStatus(updateStatus: UpdateStatus) {
    return this.http.put(`${this.orderItemApiUrl}/update-status`, updateStatus);
  }
}
