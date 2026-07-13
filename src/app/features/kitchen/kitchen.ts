import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { KitchenFacade } from './facade/kitchen.facade';
import { WorkloadGauge } from "./components/workload-gauge/workload-gauge";
import { Skeleton } from "../../shared/ui/skeleton/skeleton";
import { ErrorState } from "../../shared/ui/error-state/error-state";
import { WorkloadSummary } from "./components/workload-summary/workload-summary";
import { OrdersFacade } from '../orders/facade/orders.facade';

@Component({
  selector: 'app-kitchen',
  imports: [WorkloadGauge, Skeleton, ErrorState, WorkloadSummary],
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
