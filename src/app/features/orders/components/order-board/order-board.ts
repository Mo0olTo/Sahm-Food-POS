import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderColumn } from "../order-column/order-column";
import { OrdersFacade } from '../../facade/orders.facade';
import { OrderDetails } from "../../order-details/order-details";
import { Skeleton } from "../../../../shared/ui/skeleton/skeleton";
import { ErrorState } from "../../../../shared/ui/error-state/error-state";

@Component({
  selector: 'app-order-board',
  imports: [OrderColumn, OrderDetails, Skeleton, ErrorState],
  templateUrl: './order-board.html',
  styleUrl: './order-board.scss',
})
export class OrderBoard implements OnInit{
  private readonly facade = inject(OrdersFacade); 

  readonly columns = this.facade.groupedOrders;
  readonly selectedOrder = this.facade.selectedOrder;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly detailsOpen = signal(false);


  ngOnInit() {

    this.facade.loadOrders();
    this.facade.startLiveUpdates();
 } 

 reload(): void {
  this.facade.loadOrders();
}

 onOrderSelected(orderId: number): void {
  this.facade.selectOrder(orderId);
  this.detailsOpen.set(true);
} 

closeDetails(): void {

  this.detailsOpen.set(false);

}
}
