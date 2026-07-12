import { Component, input, output } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderCard } from "../order-card/order-card";
import { EmptyState } from "../../../../shared/ui/empty-state/empty-state";

@Component({
  selector: 'app-order-column',
  imports: [OrderCard, EmptyState],
  templateUrl: './order-column.html',
  styleUrl: './order-column.scss',
})
export class OrderColumn {
  title = input.required<string>();

  orders = input.required<Order[]>(); 
  orderSelected = output<number>();

  onOrderSelected(orderId: number): void {
    this.orderSelected.emit(orderId);
  }

  
}
