import { DestroyRef, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUserInfo } from './state/actions/auth.action';
import { selectUser } from './state/selectors/auth.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const appGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const destroyRef = inject(DestroyRef);

  store.select(selectUser).pipe(takeUntilDestroyed(destroyRef)).subscribe(user => {
    if (!user) {
      store.dispatch(loadUserInfo());
    }
  }); 

  return true;
};
