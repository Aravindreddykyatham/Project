import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/interface/product.interface';
import { SharedModule } from '../../shared/shared.module';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  selectCurrentPage,
  selectElementsPerPage,
  selectProductLoading,
  selectProducts,
  selectProductState,
  selectTotalProducts,
} from '../../store/Product/product.selectors';
import { getProducts } from '../../store/Product/product.actions';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  totalProducts$: Observable<number>;
  elementsPerPage$: Observable<number>;
  currentPage$: Observable<number>;
  searchKey: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectProductLoading);
    this.totalProducts$ = this.store.select(selectTotalProducts);
    this.elementsPerPage$ = this.store.select(selectElementsPerPage);
    this.currentPage$ = this.store.select(selectCurrentPage);
  }

  ngOnInit(): void {
    // this.productService.getProducts().subscribe((products) => {
    //   this.products = products;
    // });
    this.store.dispatch(getProducts({ page: 0, pageSize: 5 }));
  }

  showProductDetail(id: number) {
    this.router.navigate([`product-details/${id}`]);
  }

  getImage(img: String): String {
    return `data:image/png;base64,${img}`;
  }

  handlePageEvent($event: PageEvent) {
    this.store.dispatch(
      getProducts({ page: $event.pageIndex, pageSize: $event.pageSize })
    );
    console.log($event);
  }

  applySearch() {
    this.store.dispatch(
      getProducts({ page: 0, pageSize: 5, searchKey: this.searchKey })
    );
  }
  test($event: any) {
    console.log($event);
  }
}
