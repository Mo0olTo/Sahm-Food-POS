import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { OrdersStore } from '../store/orders.store';
import { LiveOrders } from '../data/live-orders';
import { OrderStatus } from '../models/order-status.type';
import { Order } from '../models/order.model';
import { KitchenLevel } from '../../kitchen/models/kitchen-level.type';
import { CreateOrder } from '../models/create.order';

@Injectable({
  providedIn: 'root',
})
export class OrdersFacade {

  private readonly store = inject(OrdersStore);
  private readonly liveService = inject(LiveOrders);
  private readonly destroyRef = inject(DestroyRef);

  // ==========================
  // State
  // ==========================

  readonly orders = this.store.orders;
  readonly groupedOrders = this.store.groupedOrders;

  readonly selectedOrder = this.store.selectedOrder;

  readonly loading = this.store.loading;
  readonly error = this.store.error;

  readonly statistics = this.store.statistics; 
  readonly kitchenOrdersCount = this.store.kitchenOrdersCount;

  // ==========================
  // Actions
  // ==========================

  loadOrders(): void {
    this.store.loadOrders();
  }
  
  createOrder(order: CreateOrder): void {

    this.store.createOrder(order);
  
  }

  updateOrder(id: number, order: Order): void {
    this.store.updateOrder(id, order);
  }

  deleteOrder(id: number): void {
    this.store.deleteOrder(id);
  }

  updateOrderStatus(
    id: number,
    status: OrderStatus,
  ): void {
  
    this.store.updateOrderStatus(id, status);
  
  }
  selectOrder(id: number): void {
    this.store.selectOrder(id);
  }

  setSearch(value: string): void {
    this.store.setSearch(value);
  } 

  // ==========================
  // Live Updates
  // ========================== 

  startLiveUpdates(): void {

    this.liveService
      .updates(this.orders)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
  
        if (!event) {
          return;
        }
  
        this.updateOrderStatus(
          event.id,
          event.status
        );
  
      });
  
  }

 
  updatePriorityByKitchen(level: KitchenLevel):void {
  
    this.store.updatePriorityByKitchen(level);
  
  }
}