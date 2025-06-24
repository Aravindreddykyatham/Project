import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getProducts } from '../../store/Product/product.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  filterForm: FormGroup<any>;
  @Output() applyClick = new EventEmitter();
  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.filterForm = fb.group({
      minPrice: [null],
      maxPrice: [null],
    });
  }

  applyFilter() {
    this.applyClick.emit(this.filterForm.value);
    this.store.dispatch(
      getProducts({
        page: 0,
        pageSize: 5,
        minPrice: this.filterForm.get('minPrice')?.value,
        maxPrice: this.filterForm.get('maxPrice')?.value,
      })
    );
  }
}
