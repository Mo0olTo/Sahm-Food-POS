import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';

import { Product } from '../../../products/models/product.model';
import { SearchFacade } from '../../facade/search.facade';
import { highlightText } from '../../utils/search-highlight';

export type ProductResultCardVariant = 'compact' | 'full';

@Component({
  selector: 'app-product-result-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-result-card.html',
  styleUrl: './product-result-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductResultCard {

  private readonly facade = inject(SearchFacade);

  private readonly sanitizer = inject(DomSanitizer);

  readonly product = input.required<Product>();

  readonly variant = input<ProductResultCardVariant>('full');

  readonly selected = input<boolean>(false);

  readonly add = output<Product>();

  protected readonly hovered = signal(false);

  protected readonly isSelected = computed(
    () => this.selected() || this.hovered(),
  );

  protected readonly containerClasses = computed(() => {

    const base =
      'group flex w-full items-center gap-3 rounded-xl border ' +
      'border-[var(--color-borders)] bg-[var(--color-section-bg)] ' +
      'px-3 py-2 text-left transition-all duration-150 ' +
      'hover:border-[var(--color-primary)] hover:bg-[var(--color-hover)]';

    const selected = this.isSelected()
      ? ' border-[var(--color-primary)] bg-[var(--color-hover)]'
      : '';

    const compact = this.variant() === 'compact' ? ' py-2' : ' p-3';

    return base + selected + compact;
  });

  protected readonly highlightedName = computed<SafeHtml>(() => {

    const html = highlightText(this.product().name, this.facade.query());

    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  protected readonly highlightedDescription = computed<SafeHtml>(() => {

    const description = this.product().description ?? '';

    const html = highlightText(description, this.facade.query());

    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  protected onAdd(): void {
    this.add.emit(this.product());
  }

}
