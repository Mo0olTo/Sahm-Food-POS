import { CreateOrder } from "../../../features/orders/models/create.order";

export type CreateOrderPayload = {
    tempId: number;
    clientId: string;
    order: CreateOrder;
  };