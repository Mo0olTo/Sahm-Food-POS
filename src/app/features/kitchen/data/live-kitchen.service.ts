import { Injectable, Signal } from '@angular/core';
import { KitchenLevel } from '../models/kitchen-level.type';
import { KitchenLoad } from '../models/kitchen-load.model';
import { interval, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LiveKitchenService {


  updates(kitchen: Signal<KitchenLoad | null>): Observable<KitchenLoad | null> {

    return interval(5000).pipe(

      map(() => {

        const current = kitchen();
      
        if (!current?.id) {
          return null;
        }
      
        const percentage = Math.floor(Math.random() * 101);
      
        return {
          ...current,
          percentage,
          level: this.getLevel(percentage),
          estimatedWait: this.getEstimatedWait(percentage),
        };
      
      })

    );

  }

  private getLevel(load: number): KitchenLevel {

    if (load < 30) return 'low';

    if (load < 60) return 'medium';

    if (load < 85) return 'high';

    return 'critical';

  }

  private getEstimatedWait(load: number): number {

    if (load < 30) return 10;

    if (load < 60) return 20;

    if (load < 85) return 35;

    return 50;

  }
}
