import { Injectable } from '@angular/core';
import {
  interval,
  Observable,
  throwError,
  timer,
} from 'rxjs';
import {
  map,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';

import { Order } from '../../../models/order.model';
import { AiAction } from '../../models/ai-action.type';
import {
  AiAnalysis,
  AiRecommendation,
} from '../../models/ai-analysis.model';

@Injectable({
  providedIn: 'root',
})
export class AiService {

  private readonly responses: Record<AiAction, AiRecommendation[]> = {

    analyze: [
      {
        id: 'analyze-1',
        title: 'Order Summary',
        description: 'The order looks complete and ready to prepare.',
      },
    ],

    upsell: [
      {
        id: 'upsell-1',
        title: 'Upsell',
        description: 'Suggest adding fries to increase the order value.',
      },
      {
        id: 'upsell-2',
        title: 'Combo',
        description: 'Offer a family meal with drinks.',
      },
    ],

    allergy: [
      {
        id: 'allergy-1',
        title: 'Allergy Warning',
        description: 'This order contains dairy products.',
      },
    ],

    delivery: [
      {
        id: 'delivery-1',
        title: 'Delivery Risk',
        description: 'Heavy traffic may delay delivery by 15 minutes.',
      },
    ],

    kitchen: [
      {
        id: 'kitchen-1',
        title: 'Kitchen Load',
        description: 'Kitchen workload is currently high.',
      },
    ],

  };

  analyze(
    order: Order,
    action: AiAction
  ): Observable<AiAnalysis> {

    return timer(2000).pipe(
      map(() => ({
        recommendations: this.responses[action],
      }))
    );

  }

  stream(
    order: Order,
    action: AiAction
  ): Observable<string> {

    const shouldFail = Math.random() < 0.3;

    const response = this.responses[action]
      .map(item => `• ${item.title}\n${item.description}`)
      .join('\n\n');

    return timer(2000).pipe(

      mergeMap(() => {

        if (shouldFail) {
          return throwError(() => new Error('AI service unavailable'));
        }

        return interval(35).pipe(
          take(response.length + 1),
          map(index => response.slice(0, index))
        );

      })

    );

  }

  prompt(
    order: Order,
    prompt: string
  ): Observable<string> {

    const response = `
        Based on order #${order.orderNumber}, I recommend reviewing the current items and checking for possible upsell opportunities.`;

            return timer(2000).pipe(

              switchMap(() =>
                interval(35).pipe(
                  take(response.length + 1),
                  map(index => response.slice(0, index))
                )
              )

            );

  }

}