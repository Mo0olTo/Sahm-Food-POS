import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { OfflineStorageService } from './offline-storage.service';
import { OfflineAction } from './models/offline.action.model';

@Injectable({
  providedIn: 'root',
})
export class OfflineQueueService {

  private readonly storage = inject(OfflineStorageService);

  private readonly _queue = signal<OfflineAction[]>(this.storage.load());

  readonly queue = this._queue.asReadonly();

  readonly pendingCount = computed(() => this._queue().length);

  readonly hasPending = computed(() => this.pendingCount() > 0);

  constructor() {
    effect(() => {
      this.storage.save(this._queue());
    });
  }

  enqueue(action: OfflineAction): void {
    this._queue.update(queue => [...queue, action]);
  }

  remove(id: string): void {
    this._queue.update(queue =>
      queue.filter(action => action.id !== id)
    );
  }

  clear(): void {
    this._queue.set([]);
    this.storage.clear();
  }

  next(): OfflineAction | undefined {
    return this._queue()[0];
  } 

  incrementRetry(id: string): void {

    this._queue.update(queue =>
      queue.map(action =>
        action.id === id
          ? {
              ...action,
              retryCount: action.retryCount + 1,
            }
          : action
      )
    );
  
  }
  
  contains(id: string): boolean {
  
    return this._queue().some(action => action.id === id);
  
  }
  
  peek(): OfflineAction | undefined {
  
    return this._queue()[0];
  
  } 

  // private isTempOrderUpdate(action: OfflineAction): boolean {

  //   if (action.type !== 'UPDATE_ORDER') {
  //     return false;
  //   }
  
  //   const payload = action.payload as {
  //     id: number;
  //   };
  
  //   return payload.id > 1000000000000;
  
  // }
 
  getAll(): OfflineAction[] {
    return this._queue();
  }

  update(id: string, action: OfflineAction): void {

    this._queue.update(queue =>
      queue.map(item =>
        item.id === id
          ? action
          : item
      )
    );
  
  }
}