import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { AiAction } from '../../models/ai-action.type';

interface SuggestedAction {
  action: AiAction;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-suggested-actions',
  standalone: true,
  templateUrl: './suggested-actions.html',
  styleUrl: './suggested-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestedActions {

  readonly loading = input(false);

  readonly actionSelected = output<AiAction>();

  protected readonly actions: SuggestedAction[] = [
    {
      action: 'analyze',
      icon: '✨',
      label: 'Analyze Order',
    },
    {
      action: 'upsell',
      icon: '💰',
      label: 'Upselling',
    },
    {
      action: 'allergy',
      icon: '⚠️',
      label: 'Allergy',
    },
    {
      action: 'delivery',
      icon: '🚚',
      label: 'Delivery',
    },
    {
      action: 'kitchen',
      icon: '🍳',
      label: 'Kitchen',
    },
  ];

  protected select(action: AiAction): void {

    if (this.loading()) {
      return;
    }

    this.actionSelected.emit(action);

  }

}