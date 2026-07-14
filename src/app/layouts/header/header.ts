import { Component, effect, inject, output } from '@angular/core';
import { KitchenFacade } from '../../features/kitchen/facade/kitchen.facade';
import { KitchenStatus } from "../../shared/ui/kitchen-status/kitchen-status";
import { OrdersFacade } from '../../features/orders/facade/orders.facade';
import { KitchenRecommendation } from "../../features/kitchen/components/kitchen-recommendation/kitchen-recommendation";
import { Search } from "../../features/search/search";
import { Product } from '../../features/products/models/product.model';

@Component({
  selector: 'app-header',
  imports: [KitchenStatus, KitchenRecommendation, Search],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private readonly kitchenFacade = inject(KitchenFacade);
  private readonly ordersFacade = inject(OrdersFacade);

  readonly kitchen = this.kitchenFacade.kitchen;
  readonly kitchenOrdersCount = this.ordersFacade.kitchenOrdersCount;

  readonly productSelected = output<Product>();

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

  protected onProductSelected(product: Product): void {

    this.productSelected.emit(product);

  }
}
