import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedActions } from './suggested-actions';

describe('SuggestedActions', () => {
  let component: SuggestedActions;
  let fixture: ComponentFixture<SuggestedActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestedActions],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestedActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
