import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit } from '@angular/core';
import { KitchenFacade } from './facade/kitchen.facade';
import { WorkloadGauge } from "./components/workload-gauge/workload-gauge";
import { Skeleton } from "../../shared/ui/skeleton/skeleton";
import { ErrorState } from "../../shared/ui/error-state/error-state";
import { WorkloadSummary } from "./components/workload-summary/workload-summary";
import { OrdersFacade } from '../orders/facade/orders.facade';
import { KitchenActiveOrders } from "./components/kitchen-active-orders/kitchen-active-orders";
import { KitchenAlerts } from "./components/kitchen-alerts/kitchen-alerts";
import { EmptyState } from "../../shared/ui/empty-state/empty-state";

@Component({
  selector: 'app-kitchen',
  imports: [WorkloadGauge, Skeleton, ErrorState, WorkloadSummary, KitchenActiveOrders, KitchenAlerts, EmptyState],
  templateUrl: './kitchen.html',
  styleUrl: './kitchen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Kitchen implements OnInit{

  private readonly kitchenFacade=inject(KitchenFacade)
  private readonly ordersFacade = inject(OrdersFacade);

  readonly kitchen = this.kitchenFacade.kitchen;
  readonly loading = this.kitchenFacade.loading;
  readonly error = this.kitchenFacade.error; 

  readonly kitchenOrdersCount = this.ordersFacade.kitchenOrdersCount; 
  readonly alerts = computed(() => this.kitchen().alerts ?? []); 

  readonly activeOrders = computed(() =>
    this.ordersFacade.orders().filter(
      order =>
        order.status === 'received' ||
        order.status === 'preparing' ||
        order.status === 'ready'
    )
  );

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

  ngOnInit(): void {

    this.kitchenFacade.loadKitchen();
  
    // this.kitchenFacade.startLiveUpdates(); 
   
  }


  reload(): void {

    this.kitchenFacade.loadKitchen();
  
  }
}
