import { ChangeDetectionStrategy,Component, computed, input } from '@angular/core';
import { KitchenLoad } from '../../models/kitchen-load.model';


@Component({
  selector: 'app-workload-gauge',
  imports: [],
  templateUrl: './workload-gauge.html',
  styleUrl: './workload-gauge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkloadGauge {


  kitchen = input.required<KitchenLoad>();

  readonly barColor = computed(() => {

    switch (this.kitchen().level) {

      case 'low':
        return 'bg-green-500';

      case 'medium':
        return 'bg-yellow-500';

      case 'high':
        return 'bg-orange-500';

      case 'critical':
        return 'bg-red-500';

      default:
        return 'bg-gray-400';

    }

  });

  readonly badgeColor = computed(() => {

    switch (this.kitchen().level) {

      case 'low':
        return 'bg-green-100 text-green-700';

      case 'medium':
        return 'bg-yellow-100 text-yellow-700';

      case 'high':
        return 'bg-orange-100 text-orange-700';

      case 'critical':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';

    }

  });

}
