import { Component, computed, input } from '@angular/core';
import { StatCardType } from './models/stat-card-type';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {

  readonly title = input.required<string>();
  readonly value = input.required<number | string>();

  readonly hint = input('');
  readonly suffix = input('');
  readonly icon = input('pi-chart-bar');

  readonly type = input<StatCardType>('total');

  readonly iconClass = computed(() => {
    switch (this.type()) {
      case 'received':
        return 'text-yellow-400';

      case 'preparing':
        return 'text-blue-400';

      case 'ready':
        return 'text-emerald-400';

      case 'completed':
        return 'text-gray-400';

      case 'delivered':
        return 'text-indigo-700';

      default:
        return 'text-[var(--color-primary)]';
    }
  });

  readonly glowClass = computed(() => {
    switch (this.type()) {
      case 'received':
        return 'bg-yellow-500';

      case 'preparing':
        return 'bg-blue-500';

      case 'ready':
        return 'bg-emerald-500';

      case 'delivered':
         return 'bg-indigo-700';

      case 'completed':
        return 'bg-gray-500';

      default:
        return 'bg-[var(--color-primary)]';
    }
  });

}