import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { map, take } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

export const createAccountGuard: CanActivateFn = (route, state) => {
  const service = inject(AccountService);
  const auth = inject(AuthService);
  const router = inject(Router);

  service.fetchUserAccount().pipe(
    take(1),
    map(account => {
      if (account.username) {
        router.navigate(['/account/' + auth.user()?.id]);
        return false;
      }
      return true;
    })
  );

  return true;
};
