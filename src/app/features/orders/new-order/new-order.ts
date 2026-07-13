import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { OrdersFacade } from '../facade/orders.facade';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderChannel } from '../models/order-channel.type';
import { OrderItem } from '../models/order-item';
import { Product } from '../../products/models/product.model';
import { ProductSelector } from '../../products/components/product-selector/product-selector';

@Component({
  selector: 'app-new-order',
  imports: [ReactiveFormsModule, ProductSelector],
  templateUrl: './new-order.html',
  styleUrl: './new-order.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewOrder {

  private readonly fb = inject(FormBuilder);
  private readonly ordersFacade = inject(OrdersFacade);
  readonly open = input.required<boolean>();
  readonly close = output<void>();
  readonly items = signal<OrderItem[]>([]);


  onClose(): void {

    this.close.emit();

  } 


  readonly form = this.fb.nonNullable.group({

    customerName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
      ],
    ],
  
    channel: [
      'walk-in',
      Validators.required,
    ],
  
    total: [
      0,
      [
        Validators.required,
        Validators.min(1),
      ],
    ],
    items: this.fb.array([]),
  
  }); 


  submit(): void {

    if (this.form.invalid) {
  
      this.form.markAllAsTouched();
  
      return;
  
    }
  
    const value = this.form.getRawValue();
  
    this.ordersFacade.createOrder({
      
      id: 0,

      orderNumber: `#A${Math.floor(Math.random() * 900 + 100)}`,
      customerName: value.customerName,

      channel: value.channel as OrderChannel,
    
      status: 'received',
    
      priority: 'normal',
    
      total: value.total.toString(),
    
      items: this.items(), 

      createdAt: new Date().toISOString(),
    
  
    });
    
    this.form.reset({
      customerName: '',
      channel: 'walk-in',
      total: 0,
    });
    this.items.set([  {
      name: '',
      price: 0,
      quantity: 1,
    }]);
    this.onClose();
  
  } 

  addItem(): void {

    this.items.update(items => [
  
      ...items,
  
      {
        name: '',
        price: 0,
        quantity: 1,
      },
  
    ]);
  
  }

  removeItem(index: number): void {

    this.items.update(items =>
      items.filter((_,i)=>i!==index)
     );
     
     
     this.updateTotal();
  
  } 


  updateItemName(
    index: number,
    value: string
  ): void {
  
    this.items.update(items =>
  
      items.map((item, i) =>
  
        i === index
          ? {
              ...item,
              name: value,
            }
          : item
  
      )
  
    );
  
  }

  updateQuantity(
    index: number,
    value: number
  ): void {
  
    this.items.update(items =>
  
      items.map((item, i) =>
  
        i === index
          ? {
              ...item,
              quantity: value,
            }
          : item
  
      )
  
    );
  
  } 

  addProduct(product: Product): void {


    this.items.update(items => [
    
     ...items,
    
     {
       name: product.name,
       price: product.price,
       quantity: 1
     }
    
    ]);
    
    
    this.updateTotal();
    
    
    } 


    updateTotal(): void {
      const total = this.items()
      .reduce(
      (sum,item)=>
      sum + (item.price * item.quantity)
      ,0
      );
      
      
      this.form.patchValue({
        total
      });
      
      
    }




}
