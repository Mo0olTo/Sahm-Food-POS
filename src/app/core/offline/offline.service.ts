import { Injectable, effect, inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { NetworkService } from './network.service';
import { OfflineQueueService } from './offline-queue.service';

import {OfflineAction,} from './models/offline.action.model';
import { OfflineActionHandler, OfflineActionType } from './models/offline.action.types';
import { Subject } from 'rxjs';
import { UpdateOrderPayload } from './models/update.order.payload';
import { CreateOrderPayload } from './models/create.order.payload';


@Injectable({
  providedIn: 'root',
})
export class OfflineService {

  private readonly network = inject(NetworkService);
  private readonly queue = inject(OfflineQueueService);

  

  private readonly handlers = new Map<OfflineActionType,OfflineActionHandler>(); 
  readonly synced = new Subject<{action: OfflineAction; result: unknown;}>();

  private syncing = false;

  constructor() {

    effect(() => {

      if (this.network.online()) {
        this.flushQueue();
      }

    });

  }

  registerHandler(
    type: OfflineActionType,
    handler: OfflineActionHandler
  ): void {

    this.handlers.set(type, handler);

  }

  execute(action: OfflineAction): void {

    if (!this.network.online()) {
  
      if (action.type === 'UPDATE_ORDER') {
  
        const update = action.payload as UpdateOrderPayload
  
        const createAction = this.queue
          .getAll()
          .find(item => {
  
            if (item.type !== 'CREATE_ORDER') {
              return false;
            }
  
            const create = item.payload as CreateOrderPayload;
  
            return create.clientId === update.clientId;
  
          });
  
        if (createAction) {
  
          const payload = createAction.payload as CreateOrderPayload;
  
          this.queue.update(createAction.id, {
            ...createAction,
            payload: {
              ...payload,
              order: {
                ...payload.order,
                ...update.order,
              },
            },
          });
  
          return;
  
        }
  
      }
  
      // أي Action أخرى أو UPDATE لم يجد CREATE
      this.queue.enqueue(action);
      return;
    }
  
    this.run(action);
  }

  private run(action: OfflineAction): void {
    console.log('RUN', action.type, action.id);
    const handler = this.handlers.get(action.type);

    if (!handler) {
      return;
    }

    handler(action.payload)
      .pipe(
        catchError(() => {

          this.queue.enqueue(action);

          return EMPTY;

        })
      )
      .subscribe({
        next: (result) => {

          this.synced.next({
            action,
            result
          });
      
        }
      });

  }

  private flushQueue(): void {

    if (this.syncing || !this.queue.hasPending()) {
      return;
    }

    this.syncing = true;

    this.processNext();

  }

  private processNext(): void {
    console.log(this.queue.getAll());
    const action = this.queue.next();

    if (!action) {

      this.syncing = false;

      return;

    }

    const handler = this.handlers.get(action.type);

    if (!handler) {

      this.queue.remove(action.id);

      this.processNext();

      return;

    }

    handler(action.payload)
      .pipe(

        finalize(() => {

          this.queue.remove(action.id);

          this.processNext();

        }),

        catchError(() => EMPTY)

      )
      .subscribe({
        next: (result) => {

          this.synced.next({
            action,
            result
          });
        
        
        }
      });

  }

}