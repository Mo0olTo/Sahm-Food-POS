import { computed, inject, signal } from '@angular/core';

import { AiService } from '../data/services/ai.service';
import { AiAction } from '../models/ai-action.type';
import { AiMessage } from '../models/ai-message.model';
import { AiStatus } from '../models/ai-status.type';
import { Order } from '../../models/order.model';
import { Observable, Subscription } from 'rxjs';

export class AiStore {

  private readonly aiService = inject(AiService);
  private subscription?: Subscription;
  private lastRequest: {
    order: Order;
    action: AiAction;
  } | null = null;

  readonly status = signal<AiStatus>('idle');
  readonly messages = signal<AiMessage[]>([]);
  readonly error = signal<string | null>(null);

  readonly isLoading = computed(() => this.status() === 'loading');
  readonly hasMessages = computed(() => this.messages().length > 0);
  readonly hasError = computed(() => this.status() === 'error');

  analyze(order: Order, action: AiAction): void {

    this.lastRequest = {
      order,
      action,
    };
  
    this.error.set(null);
  
    this.execute(
      this.aiService.stream(order, action)
    );
  
  }

  sendPrompt(order: Order, prompt: string): void {

    if (!prompt.trim()) {
      return;
    }
  
    this.error.set(null);
  
    this.addUserMessage(prompt);
  
    this.execute(
      this.aiService.prompt(order, prompt)
    );
  
  } 

  retry(): void {

    if (!this.lastRequest) {
      return;
    }
  
    this.messages.update(messages =>
      messages.filter(message => message.role === 'user')
    );
  
    this.analyze(
      this.lastRequest.order,
      this.lastRequest.action
    );

  }

  private createAssistantMessage(): string {

    const id = crypto.randomUUID();

    this.messages.update(messages => [
      ...messages,
      {
        id,
        role: 'assistant',
        content: '',
        createdAt: new Date().toISOString(),
      },
    ]);

    return id;

  }

  private updateMessage(id: string, content: string): void {

    this.messages.update(messages =>
      messages.map(message =>
        message.id === id
          ? {
              ...message,
              content,
            }
          : message
      )
    );

  }

  private removeMessage(id: string): void {

    this.messages.update(messages =>
      messages.filter(message => message.id !== id)
    );
  
  } 



  private execute(stream$: Observable<string>): void {

    this.subscription?.unsubscribe();
  
    this.status.set('loading');
    this.error.set(null);
  
    const messageId = this.createAssistantMessage();
  
    this.subscription = stream$.subscribe({
  
      next: content => {
  
        if (this.status() !== 'streaming') {
          this.status.set('streaming');
        }
  
        this.updateMessage(messageId, content);
  
      },
  
      error: () => {
  
        this.removeMessage(messageId);
  
        this.error.set('Something went wrong.');
  
        this.status.set('error');
  
      },
  
      complete: () => {
  
        this.status.set('success');
  
      }
  
    });
  
  }

  private addUserMessage(content: string): void {

    this.messages.update(messages => [
      ...messages,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        createdAt: new Date().toISOString(),
      },
    ]);
  
  } 

  clearConversation(): void {

    this.subscription?.unsubscribe();
  
    this.messages.set([]);
    this.error.set(null);
    this.status.set('idle');
  
  }

}