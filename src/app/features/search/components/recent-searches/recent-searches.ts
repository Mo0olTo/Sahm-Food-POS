import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';

import { SearchFacade } from '../../facade/search.facade';

@Component({
  selector: 'app-recent-searches',
  standalone: true,
  templateUrl: './recent-searches.html',
  styleUrl: './recent-searches.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentSearches {

  protected readonly facade = inject(SearchFacade);

  readonly selectRecent = output<string>();

  select(item: string): void {
    this.facade.setQuery(item);
    this.facade.addRecentSearch(item);
    this.selectRecent.emit(item);
  }

  clear(): void {
    this.facade.setRecentSearches([]);
  }
}
