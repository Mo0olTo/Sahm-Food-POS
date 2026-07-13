import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Product } from '../../models/product.model';


@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {


  product = input.required<Product>();


  add = output<Product>();


  addProduct(): void {

    this.add.emit(this.product());

  }

}