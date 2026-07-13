import { Component, effect, inject } from '@angular/core';
import { KitchenFacade } from '../../features/kitchen/facade/kitchen.facade';
import { KitchenStatus } from "../../shared/ui/kitchen-status/kitchen-status";
import { OrdersFacade } from '../../features/orders/facade/orders.facade';
import { KitchenRecommendation } from "../../features/kitchen/components/kitchen-recommendation/kitchen-recommendation";

@Component({
  selector: 'app-header',
  imports: [KitchenStatus, KitchenRecommendation],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private readonly kitchenFacade = inject(KitchenFacade);
  private readonly ordersFacade = inject(OrdersFacade);

  readonly kitchen = this.kitchenFacade.kitchen;
  readonly kitchenOrdersCount = this.ordersFacade.kitchenOrdersCount; 
  constructor(){

    effect(() => {

      const count = this.kitchenOrdersCount();
  
      this.kitchenFacade.updateFromOrders(count);
  
    });


    effect(() => {

      const level = this.kitchen().level;
  
      this.ordersFacade.updatePriorityByKitchen(level);
  
    });
  }
}
