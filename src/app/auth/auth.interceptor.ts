import { HttpContextToken, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  if (req.context.get(IS_PUBLIC)) {
    return next(req);
  }

  if (auth.isAuthenticated()) {
    const authRequest = addAuthorizationHeader(req);
    return next(authRequest);
  } else {
    return auth.refreshToken().pipe(
      switchMap(() => {
        const authRequest = addAuthorizationHeader(req);
        return next(authRequest);
      }),
      catchError(() => {
        router.navigate(['/auth/login']);
        return EMPTY;
      })
    );
  }
};
const addAuthorizationHeader = (req: HttpRequest<any>) => {
  const token = localStorage.getItem('token');
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
};
export const IS_PUBLIC = new HttpContextToken(() => false);