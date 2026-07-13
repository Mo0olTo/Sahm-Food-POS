import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { KitchenLoad } from '../../../features/kitchen/models/kitchen-load.model';
import { KitchenLevel } from '../../../features/kitchen/models/kitchen-level.type';

interface StatusTheme {
  track: string;
  ring: string;
  text: string;
  chip: string;
  chipText: string;
  border: string;
  dot: string;
}

@Component({
  selector: 'app-kitchen-status',
  imports: [],
  templateUrl: './kitchen-status.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenStatus {

  kitchen = input.required<KitchenLoad>();

  readonly theme = computed<StatusTheme>(() => {

    const level: KitchenLevel = this.kitchen().level;

    switch (level) {

      case 'low':
        return {
          track: 'stroke-emerald-500/15',
          ring: 'stroke-emerald-500',
          text: 'text-emerald-400',
          chip: 'bg-emerald-500/15',
          chipText: 'text-emerald-400',
          border: 'border-emerald-500/30',
          dot: 'bg-emerald-400',
        };

      case 'medium':
        return {
          track: 'stroke-amber-500/15',
          ring: 'stroke-amber-500',
          text: 'text-amber-400',
          chip: 'bg-amber-500/15',
          chipText: 'text-amber-400',
          border: 'border-amber-500/30',
          dot: 'bg-amber-400',
        };

      case 'high':
        return {
          track: 'stroke-orange-500/15',
          ring: 'stroke-orange-500',
          text: 'text-orange-400',
          chip: 'bg-orange-500/15',
          chipText: 'text-orange-400',
          border: 'border-orange-500/30',
          dot: 'bg-orange-400',
        };

      case 'critical':
        return {
          track: 'stroke-red-500/15',
          ring: 'stroke-red-500',
          text: 'text-red-400',
          chip: 'bg-red-500/15',
          chipText: 'text-red-400',
          border: 'border-red-500/40',
          dot: 'bg-red-400',
        };
    }
  });

  readonly levelLabel = computed(() => {

    const level: KitchenLevel = this.kitchen().level;

    switch (level) {
      case 'low': return 'Calm';
      case 'medium': return 'Busy';
      case 'high': return 'Strained';
      case 'critical': return 'Overloaded';
    }
  });

  // Circumference for an r=16 stroke-3 ring.
  readonly dashArray = 100.53;
  readonly dashOffset = computed(() => {
    const pct = Math.max(0, Math.min(100, this.kitchen().percentage));
    return this.dashArray - (this.dashArray * pct) / 100;
  });
}
