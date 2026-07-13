import { Component, computed, input } from '@angular/core';
import { KitchenLoad } from '../../models/kitchen-load.model';
import { Recommendation } from '../../models/recommenadtion.model';
type RecommendationVariant = 'compact' | 'card';
@Component({
  selector: 'app-kitchen-recommendation',
  imports: [],
  templateUrl: './kitchen-recommendation.html',
  styleUrl: './kitchen-recommendation.scss',
})
export class KitchenRecommendation {


  kitchen = input.required<KitchenLoad>();

  variant = input<RecommendationVariant>('compact');

  readonly recommendation = computed<Recommendation>(() => {

    switch (this.kitchen().level) {

      case 'low':
        return {
          icon: 'pi-check-circle',
          color: 'text-emerald-400',
          title: 'Kitchen operating normally',
          shortMessage: 'Everything is running smoothly.',
          description:
            'Current workload is healthy. Continue normal kitchen operations.',
          actions: [
            'Maintain current staffing',
            'Monitor incoming orders',
          ],
        };

      case 'medium':
        return {
          icon: 'pi-clock',
          color: 'text-amber-400',
          title: 'Prepare for higher demand',
          shortMessage: 'Monitor incoming orders.',
          description:
            'Order volume is increasing. Prepare ingredients and monitor queue growth.',
          actions: [
            'Prepare ingredients',
            'Watch delivery queue',
          ],
        };

      case 'high':
        return {
          icon: 'pi-users',
          color: 'text-orange-400',
          title: 'Kitchen under heavy load',
          shortMessage: 'Assign extra staff.',
          description:
            'Kitchen capacity is becoming limited. Prioritize high priority orders.',
          actions: [
            'Assign another chef',
            'Prioritize urgent orders',
            'Reduce preparation delays',
          ],
        };

      case 'critical':
        return {
          icon: 'pi-exclamation-triangle',
          color: 'text-red-400',
          title: 'Kitchen overloaded',
          shortMessage: 'Delay low priority orders.',
          description:
            'Immediate action is recommended to prevent excessive waiting times.',
          actions: [
            'Delay low priority orders',
            'Open another preparation station',
            'Notify branch manager',
          ],
        };
    }

  });

}
