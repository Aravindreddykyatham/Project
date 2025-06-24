import { Product } from './product.interface';

export interface Cart {
  totalPrice: number;
  items: Product[];
}
