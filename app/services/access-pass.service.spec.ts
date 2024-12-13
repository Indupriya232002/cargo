import { TestBed } from '@angular/core/testing';

import { AccessPassService } from './access-pass.service';

describe('AccessPassService', () => {
  let service: AccessPassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessPassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
