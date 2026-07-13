import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';

import { ProductsFacade } from '../../facade/products.facade';
import { Product } from '../../models/product.model';

import { ProductGrid } from '../product-grid/product-grid';


@Component({
  selector: 'app-product-selector',
  imports: [
    ProductGrid
  ],
  templateUrl: './product-selector.html',
  styleUrl: './product-selector.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSelector {


  private readonly productsFacade = inject(ProductsFacade);


  readonly products = this.productsFacade.products;


  productSelected = output<Product>();



  selectProduct(product: Product): void {

    this.productSelected.emit(product);

  }

}