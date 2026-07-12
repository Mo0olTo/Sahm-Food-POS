import { Component, computed, input } from '@angular/core';
import { StatCardType } from './models/stat-card-type';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {

  title = input.required<string>();

  value = input.required<number>(); 

  type = input<StatCardType>('total');

  readonly accentClass = computed(() => {
    switch (this.type()) {
      case 'received':
        return 'border-l-yellow-700';

      case 'preparing':
        return 'border-l-blue-500';

      case 'ready':
        return 'border-l-green-500';

      case 'completed':
        return 'border-l-gray-500';

      default:
        return 'border-l-[var(--color-primary)]';
    }
  });

}
