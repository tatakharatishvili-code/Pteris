import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';

const API_BASE = 'https://pteris.onrender.com/api/';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = AuthService.getStoredToken();
  const isApiRequest = req.url.startsWith(API_BASE);

  if (!token || !isApiRequest) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
