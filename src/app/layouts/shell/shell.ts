import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Sidebar } from '../sidebar/sidebar';
import { Header } from "../header/header";
import { Workspace } from "../workspace/workspace";
import { BottomNav } from "../bottom-nav/bottom-nav";
import { NewOrder } from "../../features/orders/new-order/new-order";
import { UiStore } from "../../core/ui/store/ui.store";

@Component({
  selector: 'app-shell',
  imports: [ Sidebar, Header, Workspace, BottomNav, NewOrder],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {

  private readonly uiStore = inject(UiStore);

  readonly isNewOrderDrawerOpen = this.uiStore.isNewOrderDrawerOpen;

  closeNewOrderDrawer(): void {
    this.uiStore.closeNewOrderDrawer();
  }
}
