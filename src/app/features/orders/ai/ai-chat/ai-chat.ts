import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { Order } from '../../models/order.model';
import { AiStore } from '../store/ai.store';
import { AiAction } from '../models/ai-action.type';
import { SuggestedActions } from '../components/suggested-actions/suggested-actions';
import { AiLoading } from '../components/ai-loading/ai-loading';
import { AiResponse } from "../components/ai-response/ai-response";
import { AiPrompt } from "../components/ai-prompt/ai-prompt";
import { AiTyping } from "../components/ai-typing/ai-typing";

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [SuggestedActions, AiLoading, AiResponse, AiPrompt, AiTyping],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AiStore]
})
export class AiChat {

  readonly order = input.required<Order>();

  protected readonly store = inject(AiStore);


  protected analyze(action: AiAction): void {
    this.store.analyze(this.order(), action);
  } 

  protected onPrompt(prompt: string): void {
    this.store.sendPrompt(
      this.order(),
      prompt
    );
  }
}