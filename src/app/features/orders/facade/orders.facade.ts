import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { OrdersStore } from '../store/orders.store';
import { LiveOrders } from '../data/live-orders';
import { OrderStatus } from '../models/order-status.type';
import { Order } from '../models/order.model';

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

  // ==========================
  // Actions
  // ==========================

  loadOrders(): void {
    this.store.loadOrders();
  }
  
  createOrder(order: Order): void {

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

  // startLiveUpdates(): void {

  //   this.liveService
  //     .updates()
  //     .pipe(
  //       takeUntilDestroyed(this.destroyRef)
  //     )
  //     .subscribe(() => {
  
  //       const orders = this.orders();
  
  //       if (!orders.length) {
  //         return;
  //       }
  
  //       const randomIndex = Math.floor(Math.random() * orders.length);
  
  //       const order = orders[randomIndex];
  
  //       this.updateOrderStatus(
  //         order.id,
  //         this.nextStatus(order.status)
  //       );
  //     });
  
  // }
  

  // private nextStatus(status: OrderStatus): OrderStatus {

  //   switch (status) {
  
  //     case 'received':
  //       return 'preparing';
  
  //     case 'preparing':
  //       return 'ready';
  
  //     case 'ready':
  //       return 'delivered';
  
  //     case 'delivered':
  //       return 'completed';
  
  //     default:
  //       return 'completed';
  
  //   }
  
  // }

}