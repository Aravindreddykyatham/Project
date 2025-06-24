import { ActionReducerMap } from '@ngrx/store';
import { cartReducer, CartState } from './cart/cart.reducer';
import { productReducer, ProductState } from './Product/product.reducers';
import { userReducer, UserState } from './User/user.reducer';

export interface AppState {
  cart: CartState;
  product: ProductState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: cartReducer,
  product: productReducer,
  user: userReducer,
};
