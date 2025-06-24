import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/interface/product.interface';
import { Cart } from '../../shared/interface/cart.interface';
import { PageResponse } from '../../shared/interface/pageResponse.interface';

export const getProducts = createAction(
  '[products] get products',
  props<{
    page: number;
    pageSize: number;
    searchKey?: string;
    minPrice?: number;
    maxPrice?: number;
  }>()
);

export const getProductSuccess = createAction(
  '[products] get products success',
  props<{ pageResponse: PageResponse }>()
);

export const getProductFailure = createAction(
  '[products] get products failure',
  props<{ error: string }>()
);

// export const addToCart = createAction(
//   '[cart] add To cart',
//   props<{ product: Product }>()
// );
