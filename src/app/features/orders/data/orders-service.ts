import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { API_ROUTES } from '../../../core/constants/API_ROUTES';

import { Order } from '../models/order.model';
import { CreateOrder } from '../models/create.order';


@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}${API_ROUTES.orders.getAll}`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(
      `${this.apiUrl}${API_ROUTES.orders.getById(id)}`
    );
  }

  createOrder(order: CreateOrder): Observable<Order> {
    return this.http.post<Order>(
      `${this.apiUrl}${API_ROUTES.orders.create}`,
      order
    );
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>( `${this.apiUrl}${API_ROUTES.orders.update(id)}`, order);
  } 

  updateOrderStatus(id: number, status: string) {
    return this.http.put<Order>(`${this.apiUrl}${id}`,
      {
        status
      }
    );
  }

 

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API_ROUTES.orders.delete(id)}`);
  }

}