import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUserInfo } from './state/actions/auth.action';
import { selectUser } from './state/selectors/auth.selectors';
import { take } from 'rxjs';

export const appGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);

  store.select(selectUser).pipe(take(1)).subscribe(user => {
    if (!user) {
      store.dispatch(loadUserInfo());
    }
  });

  return true;
};
