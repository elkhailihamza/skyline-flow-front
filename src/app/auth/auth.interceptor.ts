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
    return next(authRequest).pipe(
      catchError((error) => handleAuthError(error, router))
    );
  } else {
    return auth.refreshToken().pipe(
      switchMap(() => {
        const authRequest = addAuthorizationHeader(req);
        return next(authRequest).pipe(
          catchError((error) => handleAuthError(error, router))
        );
      }),
      catchError((error) => handleAuthError(error, router))
    );
  }
};

const addAuthorizationHeader = (req: HttpRequest<any>) => {
  const token = localStorage.getItem('token');
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
};

const handleAuthError = (error: any, router: Router) => {

  if (error.status === 401) {
    console.warn('Unauthorized! Redirecting to login...');
    router.navigate(['/auth/login']);
    return EMPTY;
  }

  return EMPTY;
};

export const IS_PUBLIC = new HttpContextToken(() => false);
