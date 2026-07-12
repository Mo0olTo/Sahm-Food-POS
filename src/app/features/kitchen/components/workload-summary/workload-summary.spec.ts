import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadSummary } from './workload-summary';

describe('WorkloadSummary', () => {
  let component: WorkloadSummary;
  let fixture: ComponentFixture<WorkloadSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkloadSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkloadSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
