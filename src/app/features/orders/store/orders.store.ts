import { computed, inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { OrdersService } from '../data/orders-service';
import { Order } from '../models/order.model';
import { OrderStatus } from '../models/order-status.type';
import { KitchenLevel } from '../../kitchen/models/kitchen-level.type';
import { CreateOrder } from '../models/create.order';
import { OfflineService } from '../../../core/offline/offline.service';
import { OfflineAction } from '../../../core/offline/models/offline.action.model';
import { NetworkService } from '../../../core/offline/network.service';
import { OrdersOfflineHandler } from '../../../core/offline/orders-offline.handler.service';
import { UpdateOrderPayload } from '../../../core/offline/models/update.order.payload';

@Injectable({
  providedIn: 'root',
})
export class OrdersStore {

  private readonly ordersService = inject(OrdersService);
  private readonly offline = inject(OfflineService);
  private readonly network = inject(NetworkService);
  // ==========================
  // State
  // ==========================

  private readonly _orders = signal<Order[]>([]);
  private readonly _selectedOrderId = signal<number | null>(null);
  private readonly isSubmitting = signal(false);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly search = signal(''); 

  

  // ==========================
  // Readonly State
  // ==========================

  readonly orders = this._orders.asReadonly();
  readonly selectedOrderId = this._selectedOrderId.asReadonly(); 

  constructor() {
   
    this.offline.synced.subscribe(({ action, result }) => {
  
      // CREATE_ORDER
    if (action.type === 'CREATE_ORDER') {

      const data = result as {
        tempId: number;
        clientId:string
        createdOrder: Order;
      };

      this._orders.update(orders =>
        orders.map(order =>
          order.id === data.tempId
            ? {
                ...data.createdOrder,
                clientId: data.clientId,
                syncStatus: 'synced',
              }
            : order
        )
      );

      return;
    }

    // UPDATE_ORDER
    if (action.type === 'UPDATE_ORDER') {

      const data = action.payload as UpdateOrderPayload

      this._orders.update(orders =>
        orders.map(order =>
          order.id === data.id
            ? {
                ...order,
                id:data.id,
                syncStatus: 'synced',
              }
            : order
        )
      );

    }
    });
  
  }

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

      delivered: orders.filter(o => o.status === 'delivered').length,

      ready: orders.filter(o => o.status === 'ready').length,

      completed: orders.filter(o => o.status === 'completed').length,

    };

  }); 


  readonly kitchenOrdersCount = computed(() => {

    const kitchenOrders = this._orders().filter(order =>
      order.status === 'received' ||
      order.status === 'preparing' ||
      order.status === 'ready'
    );
  
 
  
    return kitchenOrders.length;
    
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

  updatePriorityByKitchen(level: KitchenLevel): void {

    this._orders.update(orders => {
  
      const activeOrders = orders.filter(order =>
        order.status === 'received' ||
        order.status === 'preparing' ||
        order.status === 'ready'
      );
  
  
      return orders.map(order => {
  
  
        if (
          order.status === 'completed' ||
          order.status === 'delivered'
        ) {
  
          return {
            ...order,
            priority: 'normal',
            isDelayed: false,
            delayMinutes: 0,
          };
  
        }
  
  
        switch(level) {
  
  
          case 'low':
  
            return {
              ...order,
              priority: 'normal',
              isDelayed: false,
              delayMinutes: 0,
            };
  
  
          case 'medium':
  
            if (activeOrders.length > 5 &&
                order.status === 'received') {
  
              return {
                ...order,
                priority: 'high',
                isDelayed: true,
                delayMinutes: 5,
              };
  
            }
  
            return order;
  
  
  
          case 'high':
  
            if (
              order.status === 'received' ||
              order.status === 'preparing'
            ) {
  
              return {
                ...order,
                priority: 'high',
                isDelayed: true,
                delayMinutes: 15,
              };
  
            }
  
            return order;
  
  
  
          case 'critical':
  
            if (
              order.status === 'received' ||
              order.status === 'preparing' ||
              order.status === 'ready'
            ) {
  
              return {
                ...order,
                priority: 'urgent',
                isDelayed: true,
                delayMinutes: 30,
              };
  
            }
  
            return order;
  
        }
  
      });
  
    });
  
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

  createOrder(order: CreateOrder): void {

    this._loading.set(true);
    this._error.set(null);
  
    const clientId = crypto.randomUUID();
    const tempId = Date.now();

    const tempOrder: Order = {
      ...order,
      id: tempId,
      clientId,
      status: 'received',
      orderNumber: `TEMP-${tempId}`,
      createdAt: new Date().toISOString(),
      syncStatus: 'pending',
      delayMinutes: 0,
      isDelayed: false,
    };

    const action: OfflineAction<{
      tempId: number;
      clientId: string;
      order: CreateOrder;
    }> = {
      id: crypto.randomUUID(),
      type: 'CREATE_ORDER',
      payload: {
        tempId,
        clientId,
        order: {
          ...order,
          clientId,
        },
      },
      createdAt: Date.now(),
      retryCount: 0,
    };
  
  
    // optimistic update

    this._orders.update(orders => [
      tempOrder,
      ...orders
    ]);
  
  
  
   
  
    this.offline.execute(action);
  
  
    this._loading.set(false);
  
  }

  updateOrder(id:number, order: Order): void {

    // this._loading.set(true);
    this._error.set(null);
    const action: OfflineAction<{
      id: number;
      order: Order;
    }> = {
      id: crypto.randomUUID(),
      type: 'UPDATE_ORDER',
      payload: {
        id,
        order,
      },
      createdAt: Date.now(),
      retryCount: 0,
    };
    
    if (!this.network.isOnline()) {

      this.offline.execute(action);
    
      return;
    
    }

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

  updateOrderStatus(id: number, status: OrderStatus): void {


    const currentOrder = this._orders()
      .find(o => o.id === id);
  
  
    if (!currentOrder) return;
  
  
  
    // optimistic update
  
    this._orders.update(orders =>
      orders.map(order =>
        order.id === id
          ? {
              ...order,
              status,
              syncStatus:'pending'
            }
          : order
      )
    );
  
  
  
    const updatedOrder: Order = {
  
      ...currentOrder,
  
      status,
  
    };
  
  
  
    const action: OfflineAction<{
      id:number;
      clientId:string|undefined;
      order:Order;
    }> = {
  
  
      id:crypto.randomUUID(),
  
      type:'UPDATE_ORDER',
  
      payload:{
        id,
        clientId: currentOrder.clientId,
        order:updatedOrder
      },
  
      createdAt:Date.now(),
  
      retryCount:0
  
    };
  
  
  
    this.offline.execute(action);
  
  }
  
  deleteOrder(id:number): void {

  this._loading.set(true);
  this._error.set(null);
  const action: OfflineAction<{
    id: number;
  }> = {
    id: crypto.randomUUID(),
    type: 'DELETE_ORDER',
    payload: {
      id,
    },
    createdAt: Date.now(),
    retryCount: 0,
  };
  
  if (!this.network.isOnline()) {

  this.offline.execute(action);

  this._loading.set(false);

  return;

}
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