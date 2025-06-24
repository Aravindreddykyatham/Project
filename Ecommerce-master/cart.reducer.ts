import { createReducer, on, State } from '@ngrx/store';
import { Product } from '../../shared/interface/product.interface';
import { addToCart, clearCart, getCart, increment } from './cart.actions';

export interface CartState {
  totalPrice: number;
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  totalPrice: 0,
  items: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialState,
  on(getCart, (state) => ({
    ...state,
  })),

  on(clearCart, (state) => ({
    ...state,
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
  })),
  //   on(clearCart, (state) => {
  //     return { ...state, items: [], totalPrice: 0, loading: false, error: null };
  //   })
  on(increment, (state, { productId }) => {
    const updatedItems = state.items.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      items: updatedItems,
      totalPrice: calculateTotal(updatedItems),
    };
  }),
  on(addToCart, (state, { product }) => {
    const updatedItems = [...state.items, product];

    return {
      ...state,
      items: updatedItems,
      totalPrice: calculateTotal(updatedItems),
    };
  })
);

function calculateTotal(items: Product[]): number {
  let total = 0;
  items.forEach((item) => {
    total = total + item.price * item.quantity;
  });
  return total;
}
