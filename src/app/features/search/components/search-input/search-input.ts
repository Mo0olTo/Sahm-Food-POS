import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { SEARCH_CONSTANTS } from '../../utils/search.constants';
import { SearchFacade } from '../../facade/search.facade';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput {

  private readonly facade = inject(SearchFacade);

  private readonly destroyRef = inject(DestroyRef);

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('input');

  private readonly searchSubject = new Subject<string>();

  protected readonly isFocused = signal(false);

  protected readonly value = signal('');

  protected readonly activeIndex = signal(-1);

  protected readonly results = this.facade.results;

  protected readonly activeDescendantId = computed(() => {

    const index = this.activeIndex();

    if (index < 0) return null;

    return `search-result-${index}`;
  });

  readonly submit = output<string>();

  readonly navigate = output<number>();

  readonly focusChange = output<boolean>();

  constructor() {

    this.searchSubject
      .pipe(
        debounceTime(SEARCH_CONSTANTS.DEBOUNCE_TIME),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(query => {

        this.facade.setQuery(query);

      });

  }

  protected onInput(event: Event): void {

    const value = (event.target as HTMLInputElement).value;

    this.value.set(value);
    this.activeIndex.set(-1);
    this.searchSubject.next(value);

  }

  protected onFocus(): void {

    this.isFocused.set(true);
    this.focusChange.emit(true);

  }

  protected onBlur(): void {

    this.isFocused.set(false);
    setTimeout(() => {
      this.focusChange.emit(false);
    }, 150);

  }

  protected onKeydown(event: KeyboardEvent): void {

    const results = this.results();
    const maxIndex = results.length - 1;

    switch (event.key) {

      case 'ArrowDown': {

        event.preventDefault();

        if (maxIndex < 0) return;

        const next = this.activeIndex() >= maxIndex ? 0 : this.activeIndex() + 1;

        this.activeIndex.set(next);
        this.navigate.emit(next);

        break;
      }

      case 'ArrowUp': {

        event.preventDefault();

        if (maxIndex < 0) return;

        const next = this.activeIndex() <= 0 ? maxIndex : this.activeIndex() - 1;

        this.activeIndex.set(next);
        this.navigate.emit(next);

        break;
      }

      case 'Enter': {

        event.preventDefault();

        const query = this.value().trim();

        if (this.activeIndex() >= 0 && results[this.activeIndex()]) {

          const product = results[this.activeIndex()];

          this.facade.addRecentSearch(query);
          this.submit.emit(product.name);
          this.inputRef()?.nativeElement.blur();

          return;
        }

        if (query) {

          this.facade.addRecentSearch(query);
          this.submit.emit(query);

        }

        break;
      }

      case 'Escape': {

        this.inputRef()?.nativeElement.blur();
        this.clear();

        break;
      }
    }
  }

  protected clear(): void {

    this.value.set('');
    this.activeIndex.set(-1);
    this.facade.setQuery('');
    this.searchSubject.next('');

  }

  setValue(value: string): void {

    this.value.set(value);
    this.inputRef()?.nativeElement.focus();

  }

  @HostListener('document:keydown', ['$event'])
handleGlobalKeydown(event: KeyboardEvent): void {

  if (event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

  if (event.key !== '/') {
    return;
  }

  const target = event.target as HTMLElement | null;

  const isEditable =
    target?.tagName === 'INPUT' ||
    target?.tagName === 'TEXTAREA' ||
    target?.isContentEditable;

  if (isEditable) {
    return;
  }

  event.preventDefault();
  this.inputRef()?.nativeElement.focus();
}
}
