import { Component } from '@angular/core';
import { OrderBoard } from "./components/order-board/order-board";
import { OrderToolbar } from "./components/order-toolbar/order-toolbar";

@Component({
  selector: 'app-orders',
  imports: [OrderBoard, OrderToolbar],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {}
