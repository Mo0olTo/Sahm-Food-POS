import { Component, input } from '@angular/core';
import { Order } from '../models/order.model';
import { StatusBadge } from "../../../shared/ui/status-badge/status-badge";

@Component({
  selector: 'app-order-details',
  imports: [StatusBadge],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails {

  order = input<Order | null>(null);
}
