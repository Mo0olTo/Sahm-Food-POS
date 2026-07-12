import { OrderChannel } from './order-channel.type';
import { Order } from './order.model';

export interface OrderBoardColumn {
  channel: OrderChannel;
  title: string;
  orders: Order[];
}