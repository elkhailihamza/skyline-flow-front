import { DestroyRef, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export const createAccountGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const destoryRef = inject(DestroyRef);
  const router = inject(Router);

  auth.user.pipe(
    takeUntilDestroyed(destoryRef),
    map(user => {
      if (user?.account) {
        router.navigate(['/account/'+user.account.id]);
        return false;
      }
      return true;
    })
  );
  return true;
};
