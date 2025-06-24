import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/interface/user.interface';

export const getUser = createAction('[user] get user');

export const clearUser = createAction('[user] clear user');

export const login = createAction(
  '[user] log in user',
  props<{ username: string; password: string }>()
);

export const loginUserSuccess = createAction(
  '[users] login users success',
  props<{ user: User }>()
);

export const loginUserFailure = createAction(
  '[users] login users failure',
  props<{ error: string }>()
);
