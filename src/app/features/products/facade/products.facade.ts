import { Injectable, inject } from '@angular/core';

import { ProductsStore } from '../store/products.store';


@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {


  private readonly store = inject(ProductsStore);



  // ==========================
  // State
  // ==========================

  readonly products = this.store.products;

  readonly categories = this.store.categories;


}