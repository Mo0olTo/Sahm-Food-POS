
import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-priority-badge',
  imports: [NgClass],
  templateUrl: './priority-badge.html',
  styleUrl: './priority-badge.scss',
})
export class PriorityBadge {

  priority = input.required<'normal' | 'high' | 'urgent'>();

  readonly color = computed(() => {

    switch (this.priority()) {

      case 'normal':
        return 'bg-emerald-500';

      case 'high':
        return 'bg-amber-500';

      case 'urgent':
        return 'bg-red-500';

    }

  });

}
