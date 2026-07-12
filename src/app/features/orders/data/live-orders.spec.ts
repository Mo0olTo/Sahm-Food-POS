import { TestBed } from '@angular/core/testing';

import { LiveOrders } from './live-orders';

describe('LiveOrders', () => {
  let service: LiveOrders;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveOrders);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
