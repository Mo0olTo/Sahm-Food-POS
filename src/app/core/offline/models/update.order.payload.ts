import { Order } from "../../../features/orders/models/order.model";

export type UpdateOrderPayload = {
    id: number;
    clientId: string;
    order: Order;
  };