import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducers';

export const fetchProductState = createFeatureSelector<ProductState>('product');

export const selectProductState = createSelector(
  fetchProductState,
  (state: ProductState) => {
    return state;
  }
);
export const selectProducts = createSelector(
  fetchProductState,
  (state: ProductState) => {
    return state.products;
  }
);
export const selectProductError = createSelector(
  fetchProductState,
  (state: ProductState) => {
    return state.error;
  }
);

export const selectProductLoading = createSelector(
  fetchProductState,
  (state: ProductState) => {
    return state.loading;
  }
);

export const selectTotalProducts = createSelector(
  fetchProductState,
  (state: ProductState) => {
    return state.totalElements;
  }
);
export const selectElementsPerPage = createSelector(
  fetchProductState,
  (state: ProductState) => {
    return state.elementsPerPage;
  }
);
export const selectCurrentPage = createSelector(
  fetchProductState,
  (state: ProductState) => {
    return state.pageNumber;
  }
);
export const selectTotalPages = createSelector(
  fetchProductState,
  (state: ProductState) => {
    return state.totalPages;
  }
);
