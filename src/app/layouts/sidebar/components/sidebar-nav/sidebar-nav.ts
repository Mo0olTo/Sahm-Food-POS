import { Component } from '@angular/core';
import { SidebarItemNav } from "../sidebar-item-nav/sidebar-item-nav";
import { SIDEBAR_ITEMS } from '../../data/sidebar-items';

@Component({
  selector: 'app-sidebar-nav',
  imports: [SidebarItemNav],
  templateUrl: './sidebar-nav.html',
  styleUrl: './sidebar-nav.scss',
})
export class SidebarNav {

  items = SIDEBAR_ITEMS;
}
