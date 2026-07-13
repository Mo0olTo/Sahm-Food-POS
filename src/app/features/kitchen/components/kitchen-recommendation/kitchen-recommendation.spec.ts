import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenRecommendation } from './kitchen-recommendation';

describe('KitchenRecommendation', () => {
  let component: KitchenRecommendation;
  let fixture: ComponentFixture<KitchenRecommendation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenRecommendation],
    }).compileComponents();

    fixture = TestBed.createComponent(KitchenRecommendation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
