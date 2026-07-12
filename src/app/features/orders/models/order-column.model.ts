import { OrderChannel } from './order-channel.type';
import { Order } from './order.model';
import { Signal } from '@angular/core';

export interface OrderBoardColumn {
  title: string;
  channel: OrderChannel;
  orders: Signal<Order[]>;
}