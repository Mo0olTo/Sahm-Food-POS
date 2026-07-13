import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { KitchenLoad } from '../../models/kitchen-load.model';
import { KitchenLevel } from '../../models/kitchen-level.type';

interface LevelTheme {
  ring: string;
  track: string;
  text: string;
  chip: string;
  chipText: string;
  glow: string;
}

@Component({
  selector: 'app-workload-gauge',
  imports: [],
  templateUrl: './workload-gauge.html',
  styleUrl: './workload-gauge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkloadGauge {

  kitchen = input.required<KitchenLoad>();

  // 0..100 -> 0..360
  readonly rotation = computed(() => {
    const pct = Math.max(0, Math.min(100, this.kitchen().percentage));
    return (pct / 100) * 360;
  });

  readonly theme = computed<LevelTheme>(() => {

    const level: KitchenLevel = this.kitchen().level;

    switch (level) {

      case 'low':
        return {
          ring: 'stroke-emerald-500',
          track: 'stroke-emerald-500/15',
          text: 'text-emerald-400',
          chip: 'bg-emerald-500/15',
          chipText: 'text-emerald-400',
          glow: 'shadow-emerald-500/20',
        };

      case 'medium':
        return {
          ring: 'stroke-amber-500',
          track: 'stroke-amber-500/15',
          text: 'text-amber-400',
          chip: 'bg-amber-500/15',
          chipText: 'text-amber-400',
          glow: 'shadow-amber-500/20',
        };

      case 'high':
        return {
          ring: 'stroke-orange-500',
          track: 'stroke-orange-500/15',
          text: 'text-orange-400',
          chip: 'bg-orange-500/15',
          chipText: 'text-orange-400',
          glow: 'shadow-orange-500/20',
        };

      case 'critical':
        return {
          ring: 'stroke-red-500',
          track: 'stroke-red-500/15',
          text: 'text-red-400',
          chip: 'bg-red-500/15',
          chipText: 'text-red-400',
          glow: 'shadow-red-500/30',
        };
    }
  });

  readonly dashArray = 251.327;
  readonly dashOffset = computed(() => {
    return this.dashArray - (this.dashArray * Math.max(0, Math.min(100, this.kitchen().percentage))) / 100;
  });

  readonly levelLabel = computed(() => {
    const lvl: KitchenLevel = this.kitchen().level;
    switch (lvl) {
      case 'low': return 'Calm';
      case 'medium': return 'Busy';
      case 'high': return 'Strained';
      case 'critical': return 'Overloaded';
    }
  });
}
