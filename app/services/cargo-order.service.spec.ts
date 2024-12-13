import { TestBed } from '@angular/core/testing';

import { CargoOrderService } from './cargo-order.service';

describe('CargoOrderServiceService', () => {
  let service: CargoOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargoOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
