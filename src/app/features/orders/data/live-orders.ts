import { Injectable, Signal } from '@angular/core';
import { Order } from '../models/order.model';
import { interval, map, Observable } from 'rxjs';
import { OrderStatus } from '../models/order-status.type';


export interface LiveOrderEvent {
  id: number;
  status: OrderStatus;
}
@Injectable({
  providedIn: 'root',
})
export class LiveOrders {  


  updates(
    orders: Signal<Order[]>
  ): Observable<LiveOrderEvent | null> {

    return interval(7000).pipe(

      map(() => {

        const currentOrders = orders();

        if (!currentOrders.length) {
          return null;
        }

        const random =
          currentOrders[Math.floor(Math.random() * currentOrders.length)];

        return {
          id: random.id,
          status: this.nextStatus(random.status),
        };

      })

    );

  }


  private nextStatus(status: Order['status']): Order['status'] {

    switch (status) {

      case 'received':
        return 'preparing';

      case 'preparing':
        return 'ready';

      case 'ready':
        return 'delivered';

      case 'delivered':
        return 'completed';

      default:
        return 'completed';

    }

  }


}
