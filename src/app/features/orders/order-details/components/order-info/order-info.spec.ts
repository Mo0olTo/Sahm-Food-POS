import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfo } from './order-info';

describe('OrderInfo', () => {
  let component: OrderInfo;
  let fixture: ComponentFixture<OrderInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
