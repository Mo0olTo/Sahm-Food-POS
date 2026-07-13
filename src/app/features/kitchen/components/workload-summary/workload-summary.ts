import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { KitchenLoad } from '../../models/kitchen-load.model';

interface Kpi {
  key: 'active' | 'queue' | 'wait' | 'alerts';
  label: string;
  value: string;
  suffix: string;
  hint: string;
  icon: string;
  accent: string;
  glow: string;
}

@Component({
  selector: 'app-workload-summary',
  imports: [],
  templateUrl: './workload-summary.html',
  styleUrl: './workload-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkloadSummary {

  kitchen = input.required<KitchenLoad>();

  readonly kpis = computed<readonly Kpi[]>(() => {

    const k = this.kitchen();
    const alertCount = k.alerts?.length ?? 0;

    return [

      {
        key: 'active',
        label: 'Active Orders',
        value: k.activeOrders.toString(),
        suffix: '',
        hint: 'Currently being worked on',
        icon: 'pi-shopping-bag',
        accent: 'text-[var(--color-primary)]',
        glow: 'bg-[var(--color-primary)]',
      },

      {
        key: 'queue',
        label: 'In Queue',
        value: k.activeOrders.toString(),
        suffix: '',
        hint: 'Awaiting preparation',
        icon: 'pi-clock',
        accent: 'text-amber-400',
        glow: 'bg-amber-500',
      },

      {
        key: 'wait',
        label: 'Avg Wait',
        value: k.estimatedWait.toString(),
        suffix: 'min',
        hint: 'Estimated prep time',
        icon: 'pi-stopwatch',
        accent: 'text-blue-400',
        glow: 'bg-blue-500',
      },

      {
        key: 'alerts',
        label: 'Active Alerts',
        value: alertCount.toString(),
        suffix: '',
        hint: alertCount === 0 ? 'All systems normal' : 'Needs attention',
        icon: 'pi-bell',
        accent: alertCount === 0 ? 'text-emerald-400' : 'text-red-400',
        glow: alertCount === 0 ? 'bg-emerald-500' : 'bg-red-500',
      },

    ];
  });
}
