import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { select, Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectUserIsLoggedIn } from '../state/selectors/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store);

  return store.pipe(
    select(selectUserIsLoggedIn),
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
        return false;
      }
      return true;
    })
  )
};
