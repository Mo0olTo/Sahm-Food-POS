import { OrderChannel } from './order-channel.type';
import { OrderItem } from './order-item';
import { OrderPriority } from './order-poriorty';
import { OrderStatus } from './order-status.type';

export interface Order {

  id: number;

  orderNumber: string;

  customerName: string;

  channel: OrderChannel;

  status: OrderStatus;

  total: string;

  items: OrderItem[];

  createdAt: string; 

  priority : OrderPriority;

}