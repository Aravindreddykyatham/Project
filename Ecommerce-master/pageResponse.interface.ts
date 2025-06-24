import { Product } from './product.interface';

export interface PageResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
