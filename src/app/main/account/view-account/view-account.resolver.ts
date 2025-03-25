import { ResolveFn } from '@angular/router';
import { DestroyRef, inject } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../../interface/account';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const viewAccountResolver: ResolveFn<Account> = (route, state) => {
  const account = inject(AccountService);
  const destroyRef = inject(DestroyRef);

  return account.fetchAccount({ username: route.params['username'] }).pipe(
    takeUntilDestroyed(destroyRef),
  );
};
