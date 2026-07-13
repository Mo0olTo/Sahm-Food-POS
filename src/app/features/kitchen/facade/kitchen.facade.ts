import { DestroyRef, Injectable, inject, signal } from '@angular/core';

import { KitchenStore } from '../store/kitchen.store';
import { KitchenLoad } from '../models/kitchen-load.model';
import { LiveKitchenService } from '../data/live-kitchen.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrdersStore } from '../../orders/store/orders.store';
import { KitchenAlert } from '../models/kitchen-alert.model';

@Injectable({
  providedIn: 'root',
})
export class KitchenFacade {

  private readonly store = inject(KitchenStore);
  private readonly liveService = inject(LiveKitchenService);
  private readonly destroyRef = inject(DestroyRef);

  // ==========================
  // State
  // ==========================

  readonly kitchen = this.store.kitchen;
  readonly loading = this.store.loading;
  readonly error = this.store.error;

  readonly workloadColor = this.store.workloadColor;
  readonly isOverloaded = this.store.isOverloaded;
  readonly alertsCount = this.store.alertsCount; 
  readonly alerts = signal<KitchenAlert[]>([]); 

  
  // ==========================
  // Actions
  // ==========================

  loadKitchen(): void {

    this.store.loadKitchen();

  }

  updateKitchen(kitchen: KitchenLoad): void {

    this.store.updateKitchen(kitchen);

  }

  updateLoad(load: number): void {

    this.store.updateLoad(load);

  }

  clearAlerts(): void {

    this.store.clearAlerts();

  } 


  startLiveUpdates(): void {

    this.liveService
      .updates(this.kitchen)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(kitchen => {
  
        if (!kitchen) {
          return;
        }
  
        this.updateKitchen(kitchen);
  
      });
  
  } 


  updateFromOrders(count: number): void {

    this.store.updateFromOrders(count);
  
  }

}