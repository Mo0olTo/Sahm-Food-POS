import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Product } from '../../models/product.model';
import { ProductCard } from '../product-card/product-card';


@Component({
  selector: 'app-product-grid',
  imports: [
    ProductCard
  ],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGrid {


  products = input.required<readonly Product[]>();


  productSelected = output<Product>();


}