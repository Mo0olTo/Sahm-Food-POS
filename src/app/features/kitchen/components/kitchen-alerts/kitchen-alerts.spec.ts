import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenAlerts } from './kitchen-alerts';

describe('KitchenAlerts', () => {
  let component: KitchenAlerts;
  let fixture: ComponentFixture<KitchenAlerts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenAlerts],
    }).compileComponents();

    fixture = TestBed.createComponent(KitchenAlerts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
