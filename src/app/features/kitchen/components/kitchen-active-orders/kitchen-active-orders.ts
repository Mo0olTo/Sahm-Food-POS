import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Order } from '../../../orders/models/order.model';
import { OrderCard } from "../../../orders/components/order-card/order-card";

export type KitchenOrderStatus = 'received' | 'preparing' | 'ready';

interface StatusGroup {
  key: KitchenOrderStatus;
  label: string;
  tone: string;
  count: number;
  orders: readonly Order[];
}

@Component({
  selector: 'app-kitchen-active-orders',
  imports: [OrderCard],
  templateUrl: './kitchen-active-orders.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenActiveOrders {

  orders = input.required<readonly Order[]>();

  readonly groups = computed<readonly StatusGroup[]>(() => {

    const all = this.orders();

    return [
      {
        key: 'received',
        label: 'Received',
        tone: 'bg-yellow-500/15 text-yellow-400',
        count: all.filter(o => o.status === 'received').length,
        orders: all.filter(o => o.status === 'received'),
      },
      {
        key: 'preparing',
        label: 'Preparing',
        tone: 'bg-blue-500/15 text-blue-400',
        count: all.filter(o => o.status === 'preparing').length,
        orders: all.filter(o => o.status === 'preparing'),
      },
      {
        key: 'ready',
        label: 'Ready to serve',
        tone: 'bg-emerald-500/15 text-emerald-400',
        count: all.filter(o => o.status === 'ready').length,
        orders: all.filter(o => o.status === 'ready'),
      },
    ];
  });

  readonly totalCount = computed(() => this.orders().length);
}
