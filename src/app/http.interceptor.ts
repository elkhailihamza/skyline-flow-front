import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from './environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    url: `${environment.API_URL}${req.url}`,
  })
  return next(clonedRequest);
};
