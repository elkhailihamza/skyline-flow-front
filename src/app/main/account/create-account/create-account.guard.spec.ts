import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { createAccountGuard } from './create-account.guard';

describe('createAccountGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => createAccountGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
