import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from './environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const contextPath = "api";
  const clonedRequest = req.clone({
    url: `${environment.API_URL}/${contextPath}/${req.url}`,
  })
  return next(clonedRequest);
};
