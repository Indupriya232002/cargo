import { TestBed } from '@angular/core/testing';

import { CargoOrderDetailsService } from './cargo-order-details.service';

describe('CargoOrderDetailsService', () => {
  let service: CargoOrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargoOrderDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
