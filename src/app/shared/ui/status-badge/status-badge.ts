import { Component, computed, input } from '@angular/core';
import { OrderStatus } from '../../../features/orders/models/order-status.type';

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {

  status = input.required<OrderStatus>();

  readonly classes = computed(() => {

    switch (this.status()) {

      case 'received':
        return 'bg-yellow-500/15 text-yellow-400';

      case 'preparing':
        return 'bg-blue-500/15 text-blue-400';

      case 'ready':
        return 'bg-green-500/15 text-green-400';

      case 'delivered':
        return 'bg-purple-500/15 text-purple-400';

      case 'completed':
        return 'bg-gray-500/15 text-gray-300';

    }

  });

}
