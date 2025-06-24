import { createReducer, on, State } from '@ngrx/store';
import { Product } from '../../shared/interface/product.interface';
import {
  getProductFailure,
  getProducts,
  getProductSuccess,
} from './product.actions';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  totalPages: number;
  elementsPerPage: number;
  pageNumber: number;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  totalElements: 0,
  totalPages: 0,
  elementsPerPage: 0,
  pageNumber: 0,
};

export const productReducer = createReducer(
  initialState,
  on(getProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(getProductSuccess, (state, { pageResponse }) => {
    return {
      ...state,
      products: pageResponse.content,
      totalElements: pageResponse.totalElements,
      totalPages: pageResponse.totalPages,
      elementsPerPage: pageResponse.size,
      pageNumber: pageResponse.number,
      error: null,
      loading: false,
    };
  }),
  on(getProductFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    };
  })
  //object destructruing
  //   on(getProductSuccess, (state,response) => {
  //     return {
  //       ...state,
  //       products: response.products,
  //       error: null,
  //       loading: false,
  //     };
  //   })
);
