import { Component, inject, signal } from '@angular/core';
import { OrderBoard } from "./components/order-board/order-board";
import { OrderToolbar } from "./components/order-toolbar/order-toolbar";
import { NewOrder } from "./new-order/new-order";
import { UiStore } from '../../core/ui/store/ui.store';

@Component({
  selector: 'app-orders',
  imports: [OrderBoard, OrderToolbar, NewOrder],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {

  private readonly uiStore = inject(UiStore);

  readonly isDrawerOpen =
    this.uiStore.isNewOrderDrawerOpen;


closeDrawer(): void {
  this.uiStore.closeNewOrderDrawer();
}
}
