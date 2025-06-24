import { createReducer, on, State } from '@ngrx/store';
import { User } from '../../shared/interface/user.interface';
import {
  loginUserFailure,
  login,
  loginUserSuccess,
  clearUser,
} from './user.actions';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(clearUser, (state) => ({
    ...state,
    user: null,
    loading: false,
    error: null,
  })),
  on(loginUserSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      error: null,
      loading: false,
    };
  }),
  on(loginUserFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    };
  })
  //object destructruing
  //   on(getUserSuccess, (state,response) => {
  //     return {
  //       ...state,
  //       users: response.users,
  //       error: null,
  //       loading: false,
  //     };
  //   })
);
