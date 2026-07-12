import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBoard } from './order-board';

describe('OrderBoard', () => {
  let component: OrderBoard;
  let fixture: ComponentFixture<OrderBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
