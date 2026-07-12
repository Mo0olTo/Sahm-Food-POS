import { computed, inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { OrdersService } from '../data/orders-service';
import { Order } from '../models/order.model';
import { OrderStatus } from '../models/order-status.type';

@Injectable({
  providedIn: 'root',
})
export class OrdersStore {

  private readonly ordersService = inject(OrdersService);

  // ==========================
  // State
  // ==========================

  private readonly _orders = signal<Order[]>([]);
  private readonly _selectedOrderId = signal<number | null>(null);

  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly search = signal('');

  // ==========================
  // Readonly State
  // ==========================

  readonly orders = this._orders.asReadonly();
  readonly selectedOrderId = this._selectedOrderId.asReadonly();

  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // ==========================
  // Computed
  // ==========================

  readonly filteredOrders = computed(() => {

    const search = this.search().trim().toLowerCase();

    if (!search) {
      return this._orders();
    }

    return this._orders().filter(order =>
      order.orderNumber.toLowerCase().includes(search) ||
      order.customerName.toLowerCase().includes(search) ||
      order.status.toLowerCase().includes(search)
    );

  });

  readonly groupedOrders = computed(() => {

    const orders = this.filteredOrders();

    return [

      {
        channel: 'walk-in',
        title: 'Walk-in',
        orders: orders.filter(order => order.channel === 'walk-in'),
      },

      {
        channel: 'delivery',
        title: 'Delivery',
        orders: orders.filter(order => order.channel === 'delivery'),
      },

      {
        channel: 'online',
        title: 'Online',
        orders: orders.filter(order => order.channel === 'online'),
      },

    ];

  });

  readonly selectedOrder = computed(() =>
    this._orders().find(
      order => order.id === this._selectedOrderId()
    ) ?? null
  );

  readonly statistics = computed(() => {

    const orders = this.filteredOrders();

    return {

      total: orders.length,

      recieved: orders.filter(o => o.status === 'received').length,

      preparing: orders.filter(o => o.status === 'preparing').length,

      ready: orders.filter(o => o.status === 'ready').length,

      completed: orders.filter(o => o.status === 'completed').length,

    };

  });

  // ==========================
  // Actions
  // ==========================

  selectOrder(id:number): void {
    this._selectedOrderId.set(id);
  }

  setSearch(value: string): void {
    this.search.set(value);
  }

  // ==========================
  // API
  // ==========================

  loadOrders(): void {

    this._loading.set(true);
    this._error.set(null);

    this.ordersService
      .getOrders()
      .pipe(
        finalize(() => this._loading.set(false))
      )
      .subscribe({

        next: (orders) => {

          this._orders.set(orders);

        },

        error: (err) => {

          this._error.set(
            'Failed to load orders. Please try again later.',
          );

        },

      });

  }

  createOrder(order: Order): void {

    this._loading.set(true);
    this._error.set(null);
  
    this.ordersService
      .createOrder(order)
      .pipe(
        finalize(() => this._loading.set(false))
      )
      .subscribe({
  
        next: (createdOrder) => {
  
          this._orders.update(orders => [
            createdOrder,
            ...orders
          ]);
  
        },
  
        error: (err) => {
  
          console.error(err);
  
          this._error.set(
            'Failed to create order.'
          );
  
        },
  
      });
  
  }

  updateOrder(id:number, order: Order): void {

    // this._loading.set(true);
    this._error.set(null);
  
    this.ordersService
      .updateOrder(id, order)
      .pipe(
        finalize(() => this._loading.set(false))
      )
      .subscribe({
        
        next: (updatedOrder) => {
            this._orders.update(orders =>
            orders.map(o => {
             return o.id === id
                ? { ...o, ...updatedOrder, status: order.status }
                : o;
            })
          );
        },
  
        error: (err) => {    
          this._error.set('Failed to update order.'); },
  
      });
  
  }

  updateOrderStatus(id:number,status: OrderStatus): void {
  
    const order = this._orders().find(o => o.id === id);
  
    if (!order) return;
  
    const updatedOrder: Order = {
      ...order,
      status,
    };
  
    this.updateOrder(id, updatedOrder);
  
  }


  
  deleteOrder(id:number): void {

  this._loading.set(true);
  this._error.set(null);

  this.ordersService
    .deleteOrder(id)
    .pipe(
      finalize(() => this._loading.set(false))
    )
    .subscribe({

      next: () => {

        this._orders.update(orders =>
          orders.filter(order => order.id !== id)
        );

      },

      error: (err) => {

        console.error(err);

        this._error.set('Failed to delete order.');

      },

    });

}

}