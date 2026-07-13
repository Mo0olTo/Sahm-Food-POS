import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenStatus } from './kitchen-status';

describe('KitchenStatus', () => {
  let component: KitchenStatus;
  let fixture: ComponentFixture<KitchenStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(KitchenStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
