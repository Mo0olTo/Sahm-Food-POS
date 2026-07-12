import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductResultCard } from './product-result-card';

describe('ProductResultCard', () => {
  let component: ProductResultCard;
  let fixture: ComponentFixture<ProductResultCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductResultCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductResultCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
