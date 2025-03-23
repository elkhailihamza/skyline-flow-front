import { HttpContextToken, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (req.context.get(IS_PUBLIC)) {
    return next(addAuthorizationHeader(req));
  }

  return handleAuthentication(req, auth, router, next);
};

const handleAuthentication = (req: HttpRequest<any>, auth: AuthService, router: Router, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  return auth.isAuthenticated().pipe(
    switchMap((isAuthenticated) => {
      if (isAuthenticated) {
        return sendRequestWithCredentials(req, router, next);
      } else {
        return refreshAuthToken(req, auth, router, next);
      }
    }),
    catchError((error) => handleAuthError(error, router))
  );
};

const refreshAuthToken = (req: HttpRequest<any>, auth: AuthService, router: Router, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  return auth.refreshToken().pipe(
    switchMap((refreshData) => {
      if (refreshData) {
        return sendRequestWithCredentials(req, router, next);
      } else {
        auth.logout();
        router.navigate(['/auth/login']);
        return EMPTY;
      }
    }),
    catchError((error) => handleAuthError(error, router))
  );
};

const sendRequestWithCredentials = (req: HttpRequest<any>, router: Router, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  return next(addAuthorizationHeader(req)).pipe(
    catchError((error) => handleAuthError(error, router))
  );
};

const addAuthorizationHeader = (req: HttpRequest<any>): HttpRequest<any> => {
  return req.clone({ withCredentials: true });
};

const handleAuthError = (error: any, router: Router): Observable<never> => {
  if (error.status === 401) {
    console.warn('Unauthorized! Redirecting to login...');
    router.navigate(['/auth/login']);
    return EMPTY;
  }
  return EMPTY;
};

export const IS_PUBLIC = new HttpContextToken(() => false);
