import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { UiStore } from '../../core/ui/store/ui.store';

interface BottomNavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNav {

  private readonly uiStore = inject(UiStore);

  readonly items: readonly BottomNavItem[] = [
    { label: 'Dashboard', icon: 'pi-th-large', route: '/dashboard' },
    { label: 'Kitchen', icon: 'pi-shop', route: '/kitchen' },
    { label: 'New Order', icon: 'pi-plus-circle', route: '/orders' },
  ];

  openNewOrder(): void {
    this.uiStore.openNewOrderDrawer();
  }
}
