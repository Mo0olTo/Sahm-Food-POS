import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarNav } from "./components/sidebar-nav/sidebar-nav";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, SidebarNav],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {

}
