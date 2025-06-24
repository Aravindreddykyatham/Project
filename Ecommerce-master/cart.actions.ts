import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/interface/product.interface';

export const getCart = createAction('[cart] get cart');

export const clearCart = createAction('[cart] clear cart');

export const addToCart = createAction(
  '[cart] add To cart',
  props<{ product: Product }>()
);

export const increment = createAction(
  '[cart] increment cart',
  props<{ productId: Number }>()
);
