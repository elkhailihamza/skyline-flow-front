import { TestBed } from '@angular/core/testing';

import { JwtutilService } from './jwtutil.service';

describe('JwtutilService', () => {
  let service: JwtutilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtutilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
