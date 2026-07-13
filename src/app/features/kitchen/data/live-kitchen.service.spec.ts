import { TestBed } from '@angular/core/testing';

import { LiveKitchenService } from './live-kitchen.service';

describe('LiveKitchenService', () => {
  let service: LiveKitchenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveKitchenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
