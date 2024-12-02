import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './components/register-login/service/auth.service';
import { inject, Inject, Injectable } from '@angular/core';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getAccessToken();

    if (token) {
      req = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`)
      })
    }


    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/refresh-token')) {
          this.authService.refreshAccessToken().pipe(
            switchMap(() => {
              const newToken = this.authService.getAccessToken();
              const newAuth = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next.handle(newAuth);
            })).subscribe();
        } return throwError(error)
      }))
  }
}


