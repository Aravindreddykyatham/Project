import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { AppState } from '../store/app.state';
import { Injectable } from '@angular/core';
import { selectToken } from '../store/User/user.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        if (token) {
          const cloneRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(cloneRequest);
        }
        return next.handle(req);
      })
    );
  }
}
