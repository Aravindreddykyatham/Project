import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';
import { PageResponse } from '../interface/pageResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {}

  getProducts(
    page: number,
    pageSize: number,
    searchKey?: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<PageResponse> {
    const params: any = { page, pageSize };
    if (searchKey) {
      params.searchKey = searchKey;
    }
    if (minPrice) {
      params.minPrice = minPrice;
    }
    if (maxPrice) {
      params.maxPrice = maxPrice;
    }
    return this.http.get<PageResponse>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  addProduct(formData: FormData): Observable<Product> {
    return this.http.post(
      `${this.apiUrl}/register`,
      formData
    ) as Observable<Product>;
  }
}
