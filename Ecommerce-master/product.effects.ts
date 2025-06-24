import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getProductFailure,
  getProducts,
  getProductSuccess,
} from './product.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from '../../shared/services/product.service';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class ProductEffects {
  actions$ = inject(Actions);
  constructor(private productService: ProductService) {}

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProducts),
      mergeMap((actionData) => {
        return this.productService
          .getProducts(
            actionData.page,
            actionData.pageSize,
            actionData.searchKey,
            actionData.minPrice,
            actionData.maxPrice
          )
          .pipe(
            map((pageResponse) => getProductSuccess({ pageResponse })),
            catchError((error) => of(getProductFailure({ error })))
          );
      })
    );
  });
}
