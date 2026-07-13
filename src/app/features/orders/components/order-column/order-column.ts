import { Component, inject, input, output } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderCard } from "../order-card/order-card";
import { EmptyState } from "../../../../shared/ui/empty-state/empty-state";
import { OrdersFacade } from '../../facade/orders.facade';

@Component({
  selector: 'app-order-column',
  imports: [OrderCard, EmptyState],
  templateUrl: './order-column.html',
  styleUrl: './order-column.scss',
})
export class OrderColumn { 

  private readonly facade=inject(OrdersFacade)
  title = input.required<string>();

  orders = input.required<Order[]>(); 
  orderSelected = output<number>();

  onOrderSelected(orderId: number): void {
    this.orderSelected.emit(orderId);
  }
  
  deleteOrder(id: number): void {
    this.facade.deleteOrder(id)
  }
  
}
