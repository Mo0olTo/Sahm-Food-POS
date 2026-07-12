import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiLoading } from './ai-loading';

describe('AiLoading', () => {
  let component: AiLoading;
  let fixture: ComponentFixture<AiLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiLoading],
    }).compileComponents();

    fixture = TestBed.createComponent(AiLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
