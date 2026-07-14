import { Injectable, inject } from '@angular/core';

import { OfflineService } from './offline.service';

import { OrdersService } from '../../features/orders/data/orders-service';

import { CreateOrder } from '../../features/orders/models/create.order';
import { Order } from '../../features/orders/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OfflineHandlersService {

  private readonly offline = inject(OfflineService);
  private readonly orders = inject(OrdersService);

  constructor() {
    this.registerHandlers();
  }

  private registerHandlers(): void {

    this.offline.registerHandler(
      'CREATE_ORDER',
      payload =>
        this.orders.createOrder(payload as CreateOrder)
    );

    this.offline.registerHandler(
      'UPDATE_ORDER',
      payload => {

        const { id, order } = payload as {
          id: number;
          order: Order;
        };

        return this.orders.updateOrder(id, order);

      }
    );

    this.offline.registerHandler(
      'DELETE_ORDER',
      payload => {

        const { id } = payload as {
          id: number;
        };

        return this.orders.deleteOrder(id);

      }
    );

  }

}