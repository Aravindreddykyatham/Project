import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
  selectCartState,
  (state: CartState) => {
    return state;
  }
);
export const selectItems = createSelector(
  selectCartState,
  (state: CartState) => {
    return state.items;
  }
);
// export const itemIncrement = createSelector(
//   selectCartState,
//   (state: CartState) => {
//     return state.items;
//   }
// );
export const selectTotalPrice = createSelector(
  selectCartState,
  (state: CartState) => {
    return state.totalPrice;
  }
);
export const selectError = createSelector(
  selectCartState,
  (state: CartState) => {
    return state.error;
  }
);
