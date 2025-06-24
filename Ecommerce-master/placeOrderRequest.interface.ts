export interface PlaceOrderRequest {
  orderItems: Array<OrderItems>;
  userId: number;
}

export interface OrderItems {
  quantity: number;
  productId: number;
}
