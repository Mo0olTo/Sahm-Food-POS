import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadGauge } from './workload-gauge';

describe('WorkloadGauge', () => {
  let component: WorkloadGauge;
  let fixture: ComponentFixture<WorkloadGauge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkloadGauge],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkloadGauge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
