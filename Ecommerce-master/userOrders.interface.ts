export interface UserOrders {
  userOrders: Array<UserOrder>;
}

export interface UserOrder {
  orderId: number;
  orderItems: Array<UserOrderItems>;
  total: number;
  status: string;
}

export interface UserOrderItems {
  id: number;
  name: String;
  description: String;
  price: number;
  quantity: number;
  image: String;
  status: string;
  sellerId: number;
}
