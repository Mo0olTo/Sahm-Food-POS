import { Component, input } from '@angular/core';
import { SidebarItem } from '../../models/sidebar-items.model';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sidebar-item-nav',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar-item-nav.html',
  styleUrl: './sidebar-item-nav.scss',
})
export class SidebarItemNav {
 item=input.required<SidebarItem>()
}
