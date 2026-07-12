import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenLoadMonitor } from './kitchen-load-monitor';

describe('KitchenLoadMonitor', () => {
  let component: KitchenLoadMonitor;
  let fixture: ComponentFixture<KitchenLoadMonitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenLoadMonitor],
    }).compileComponents();

    fixture = TestBed.createComponent(KitchenLoadMonitor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
