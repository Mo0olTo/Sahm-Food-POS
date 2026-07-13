import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { NgClass } from '@angular/common';

import { KitchenLoad } from '../../../features/kitchen/models/kitchen-load.model';

@Component({
  selector: 'app-kitchen-status',
  imports: [NgClass],
  templateUrl: './kitchen-status.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenStatus {

  kitchen = input.required<KitchenLoad>();

  readonly progressColor = computed(() => {

    switch (this.kitchen().level) {

      case 'low':
        return 'bg-emerald-500';

      case 'medium':
        return 'bg-amber-500';

      case 'high':
        return 'bg-orange-500';

      case 'critical':
        return 'bg-red-500';

    }

  }); 


  readonly levelClass = computed(() => {

    switch (this.kitchen().level) {
  
      case 'low':
        return 'bg-emerald-100 text-emerald-700';
  
      case 'medium':
        return 'bg-amber-100 text-amber-700';
  
      case 'high':
        return 'bg-orange-100 text-orange-700';
  
      case 'critical':
        return 'bg-red-100 text-red-700';
  
    }
  
  });

}