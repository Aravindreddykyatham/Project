import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginUserFailure, login, loginUserSuccess } from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  constructor(private authService: AuthService) {}

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      mergeMap((action) => {
        return this.authService
          .checkAuth(action.username, action.password)
          .pipe(
            map((user) => {
              localStorage.setItem('user', JSON.stringify(user));
              return loginUserSuccess({ user });
            }),
            catchError((error) => of(loginUserFailure({ error })))
          );
      })
    );
  });
}
