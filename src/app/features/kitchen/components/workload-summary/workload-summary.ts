import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { KitchenLoad } from '../../models/kitchen-load.model';

@Component({
  selector: 'app-workload-summary',
  imports: [],
  templateUrl: './workload-summary.html',
  styleUrl: './workload-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkloadSummary {

  kitchen = input.required<KitchenLoad>();
}
