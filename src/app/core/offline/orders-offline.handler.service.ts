import { inject, Injectable } from "@angular/core";
import { OfflineService } from "./offline.service";
import { OrdersService } from "../../features/orders/data/orders-service";
import { map, Observable } from "rxjs";
import { CreateOrder } from "../../features/orders/models/create.order";
import { Order } from "../../features/orders/models/order.model";
import { CreateOrderPayload } from "./models/create.order.payload";


@Injectable({
  providedIn: 'root',
})
export class OrdersOfflineHandler {


  private readonly offline = inject(OfflineService);
  private readonly ordersService = inject(OrdersService);



  constructor() {

    this.register();

  }



  private register(): void {


    this.offline.registerHandler(
      'CREATE_ORDER',
      (payload: unknown): Observable<unknown> => {
    
        const data = payload as CreateOrderPayload
    
        return this.ordersService.createOrder(data.order).pipe(
          map(createdOrder => ({
            tempId: data.tempId,
            clientId: data.clientId,
            createdOrder,
          }))
        );
    
      }
    );


    this.offline.registerHandler(
      'UPDATE_ORDER',
      (payload: unknown): Observable<unknown> => {


        const data = payload as {
          id:number;
          order:Order;
        };


        return this.ordersService.updateOrder(
          data.id,
          data.order
        );

      }
    );



    this.offline.registerHandler(
      'DELETE_ORDER',
      (payload: unknown): Observable<unknown> => {

        const data = payload as {
          id:number;
        };


        return this.ordersService.deleteOrder(
          data.id
        );

      }
    );


  }


}