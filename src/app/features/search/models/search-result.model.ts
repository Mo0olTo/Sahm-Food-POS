import { Product } from '../../products/models/product.model';

export interface SearchResult {
  product: Product;
  matchedFields?: string[];
  score?: number;
}