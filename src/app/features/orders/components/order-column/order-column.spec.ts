import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderColumn } from './order-column';

describe('OrderColumn', () => {
  let component: OrderColumn;
  let fixture: ComponentFixture<OrderColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderColumn],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderColumn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
