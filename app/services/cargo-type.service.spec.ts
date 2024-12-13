import { TestBed } from '@angular/core/testing';

import { CargoTypeService } from './cargo-type.service';

describe('CargoTypeService', () => {
  let service: CargoTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargoTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
