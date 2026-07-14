import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiTyping } from './ai-typing';

describe('AiTyping', () => {
  let component: AiTyping;
  let fixture: ComponentFixture<AiTyping>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiTyping],
    }).compileComponents();

    fixture = TestBed.createComponent(AiTyping);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
