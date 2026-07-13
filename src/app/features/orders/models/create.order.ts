import { OrderChannel } from "./order-channel.type";
import { OrderItem } from "./order-item";
import { OrderPriority } from "./order-poriorty";
import { OrderStatus } from "./order-status.type";

export interface CreateOrder { 

     id: number;

  orderNumber: string;

  customerName: string;

  channel: OrderChannel;

  priority: OrderPriority;

  status: OrderStatus;

  total: string;

  items: OrderItem[];

  createdAt: string;
  }