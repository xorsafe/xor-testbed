import { TestBed } from '@angular/core/testing';

import { XorTestbedService } from './xor-testbed.service';

describe('XorTestbedService', () => {
  let service: XorTestbedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XorTestbedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
