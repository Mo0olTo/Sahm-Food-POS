import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../products/models/product.model';
import { filterProducts } from '../utils/search-filter';

@Injectable({
  providedIn: 'root',
})
export class SearchStore {

  readonly products = signal<Product[]>([]);

  readonly query = signal('');

  readonly selectedCategory = signal<string | null>(null);

  readonly recentSearches = signal<string[]>([]);

  readonly selectedIndex = signal(-1);

  readonly isSearching = signal(false);

  readonly results = computed(() => {

    const query = this.query().trim();
  
    if (!query) {
      return [];
    }
  
    return filterProducts(
      this.products(),
      query,
      this.selectedCategory(),
    );
  
  });

  setProducts(products: Product[]) {
    this.products.set(products);
  }

  setQuery(query: string) {
    this.query.set(query);
  }

  setCategory(category: string | null) {
    this.selectedCategory.set(category);
  }

  setSearching(value: boolean) {
    this.isSearching.set(value);
  }

  setSelectedIndex(index: number) {
    this.selectedIndex.set(index);
  }

  addRecentSearch(query: string) {
    if (!query.trim()) return;

    const filtered = this.recentSearches().filter(item => item !== query);

    this.recentSearches.set([
      query,
      ...filtered,
    ].slice(0, 5));
  }

  setRecentSearches(items: string[]) {
    this.recentSearches.set(items);
  }

}