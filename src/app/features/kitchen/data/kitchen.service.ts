import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { KitchenLoad } from '../models/kitchen-load.model';
import { map, Observable } from 'rxjs';
import { API_ROUTES } from '../../../core/constants/API_ROUTES';

@Injectable({
  providedIn: 'root',
})
export class KitchenService {


  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

 
  getKitchen(): Observable<KitchenLoad> {

    return this.http
      .get<KitchenLoad[]>(
        `${this.apiUrl}${API_ROUTES.kitchen.get}`
      )
      .pipe(

        map(kitchens => {

          const kitchen = kitchens[0];

          return {
            ...kitchen,
            alerts: kitchen.alerts ?? []
          };

        })

      );

  }


  updateKitchen(
    id: number,
    kitchen: KitchenLoad
  ): Observable<KitchenLoad> {

    return this.http.put<KitchenLoad>(
      `${this.apiUrl}${API_ROUTES.kitchen.update(id)}`,
      kitchen
    );

  }

}
