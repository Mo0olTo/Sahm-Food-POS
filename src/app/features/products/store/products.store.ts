import { computed, Injectable, signal } from '@angular/core';

import { Product } from '../models/product.model';
import { PRODUCTS } from '../data/products.data';


@Injectable({
  providedIn: 'root',
})
export class ProductsStore {


  // ==========================
  // State
  // ==========================

  private readonly _products = signal<Product[]>(PRODUCTS);



  // ==========================
  // Readonly State
  // ==========================

  readonly products = this._products.asReadonly();



  // ==========================
  // Computed
  // ==========================

  readonly categories = computed(() => {

    return [
      ...new Set(
        this._products()
          .map(product => product.category)
      )
    ];

  });


}