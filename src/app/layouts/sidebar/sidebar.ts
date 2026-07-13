import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarNav } from "./components/sidebar-nav/sidebar-nav";
import { UiStore } from '../../core/ui/store/ui.store';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, SidebarNav],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {


  private readonly uiStore = inject(UiStore);

  openNewOrder(): void {

    this.uiStore.openNewOrderDrawer();
  
  }
}
