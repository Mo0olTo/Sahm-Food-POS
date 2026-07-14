import {
  computed,
  effect,
  inject,
  Injectable,
} from '@angular/core';

import { SearchStore } from '../store/search.store';
import { ProductsFacade } from '../../products/facade/products.facade';

@Injectable({
  providedIn: 'root',
})
export class SearchFacade {

  private readonly store = inject(SearchStore);

  private readonly productsFacade = inject(ProductsFacade);

  constructor() {

    effect(() => {

      this.store.setProducts(
        this.productsFacade.products()
      );

    });

  }

  readonly results = this.store.results;

  readonly query = this.store.query;

  readonly recentSearches = this.store.recentSearches;

  readonly selectedCategory = this.store.selectedCategory;

  readonly selectedIndex = this.store.selectedIndex;

  readonly isSearching = this.store.isSearching;

  readonly hasResults = computed(() => this.results().length > 0);

  setQuery(query: string) {
    this.store.setQuery(query);
  }

  setCategory(category: string | null) {
    this.store.setCategory(category);
  }

  addRecentSearch(query: string) {
    this.store.addRecentSearch(query);
  }

  setRecentSearches(items: string[]) {
    this.store.setRecentSearches(items);
  }

  setSelectedIndex(index: number) {
    this.store.setSelectedIndex(index);
  }

}