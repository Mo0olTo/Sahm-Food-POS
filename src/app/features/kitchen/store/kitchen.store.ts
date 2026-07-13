import { computed, inject, Injectable, signal } from '@angular/core';
import { KitchenLoad } from '../models/kitchen-load.model';
import { finalize } from 'rxjs';
import { KitchenService } from '../data/kitchen.service';

@Injectable({
  providedIn: 'root',
})
export class KitchenStore { 


    private readonly kitchenService = inject(KitchenService);

  // ==========================
  // State
  // ==========================

  private readonly _kitchen = signal<KitchenLoad>({
  id: 1,
  alerts: [],
  percentage: 0,
  level: 'low',
  activeOrders: 0,
  estimatedWait: 0
});

  private readonly _loading = signal(false);

  private readonly _error = signal<string | null>(null);

  // ==========================
  // Readonly State
  // ==========================

  readonly kitchen = this._kitchen.asReadonly();

  readonly loading = this._loading.asReadonly();

  readonly error = this._error.asReadonly();

  // ==========================
  // Computed
  // ==========================

  readonly workloadColor = computed(() => {

    const kitchen = this._kitchen();

    if (!kitchen) return 'gray';

    switch (kitchen.level) {

      case 'low':
        return 'green';

      case 'medium':
        return 'yellow';

      case 'high':
        return 'orange';

      case 'critical':
        return 'red';

    }

  });

  readonly isOverloaded = computed(() => {

    return this._kitchen()?.level === 'critical';

  });

  readonly alertsCount = computed(() => {

    return this._kitchen()?.alerts.length ?? 0;

  }); 

  

  // ==========================
  // Actions
  // ==========================

  loadKitchen(): void {

    this._loading.set(true);
    this._error.set(null);
  
    this.kitchenService.getKitchen().pipe(
        finalize(() => this._loading.set(false))
      )
      .subscribe({
        
        next: (kitchen) => {

          this._kitchen.update(current => ({
        
            ...current,
        
            alerts: kitchen.alerts ?? []
        
          }));
        
        },
  
        error: () => {
  
          this._error.set(
            'Failed to load kitchen status.'
          );
  
        },
  
      });
  
  }

  updateKitchen(kitchen: KitchenLoad): void {

    this._kitchen.set({
      ...kitchen,
      alerts: kitchen.alerts ?? []
    });
  
  }

  updateLoad(load: number): void {

    const kitchen = this._kitchen();
  
    if (!kitchen) {
      return;
    }
  
    this.updateKitchen({
  
      ...kitchen,
  
      percentage: load,
  
    });
  
  }

  clearAlerts(): void {

    const kitchen = this._kitchen();
  
    if (!kitchen) {
      return;
    }
  
    this.updateKitchen({
  
      ...kitchen,
  
      alerts: [],
  
    });
  
  }
 
  updateFromOrders(activeOrders: number): void {

    let percentage = 0;
    let level: KitchenLoad['level'] = 'low';
    let estimatedWait = 0;
  
  
    if (activeOrders <= 5) {
  
      percentage = 5;
      level = 'low';
      estimatedWait = 10;
  
    } 
    else if (activeOrders <= 8) {
  
      percentage = 50;
      level = 'medium';
      estimatedWait = 25;
  
    } 
    else if (activeOrders <= 12) {
  
      percentage = 75;
      level = 'high';
      estimatedWait = 45;
  
    } 
    else {
  
      percentage = 95;
      level = 'critical';
      estimatedWait = 60;
  
    }
  
  
    this._kitchen.update(kitchen => ({
  
      ...kitchen,
  
      activeOrders,
  
      percentage,
  
      level,
  
      estimatedWait
  
    }));
  
  }
}