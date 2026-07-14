import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';

import { SearchFacade } from '../../facade/search.facade';
import { ProductResultCard } from '../product-result-card/product-result-card';
import { RecentSearches } from '../recent-searches/recent-searches';
import { Product } from '../../../products/models/product.model';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [ProductResultCard, RecentSearches],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResults {

  protected readonly facade = inject(SearchFacade);

  protected readonly selectedIndex = this.facade.selectedIndex;
  
  readonly productSelected = output<Product>();
  
  selectProduct(product: Product): void {

    this.facade.addRecentSearch(this.facade.query());
    this.productSelected.emit(product);

  }

}
