import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  output,
  HostListener,
} from '@angular/core';

import { SearchInput } from './components/search-input/search-input';
import { SearchResults } from './components/search-results/search-results';
import { SearchFacade } from './facade/search.facade';
import { Product } from '../products/models/product.model';

@Component({
  selector: 'app-search',
  imports: [SearchInput, SearchResults],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search {

  private readonly facade = inject(SearchFacade);

  protected readonly isOpen = signal(false);

  readonly productSelected = output<Product>();

  protected onFocusChange(focused: boolean): void {

    this.isOpen.set(focused);

  }

  protected onNavigate(_index: number): void {

    if (!this.isOpen()) {
      this.isOpen.set(true);
    }

  }

  protected onSubmit(query: string): void {
    this.facade.addRecentSearch(query);
    this.isOpen.set(false);

  }

  protected onProductSelected(product: Product): void {

    this.isOpen.set(false);
    this.productSelected.emit(product);

  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {

    const target = event.target as HTMLElement;

    if (!target.closest('app-search')) {
      this.isOpen.set(false);
    }

  }
}
