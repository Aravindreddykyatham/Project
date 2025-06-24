import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const fetchUserState = createFeatureSelector<UserState>('user');

export const selectUserState = createSelector(
  fetchUserState,
  (state: UserState) => {
    return state;
  }
);
export const selectUser = createSelector(fetchUserState, (state: UserState) => {
  return state.user;
});
export const selectUserError = createSelector(
  fetchUserState,
  (state: UserState) => {
    return state.error;
  }
);

export const selectUserLoading = createSelector(
  fetchUserState,
  (state: UserState) => {
    return state.loading;
  }
);

export const selectToken = createSelector(
  fetchUserState,
  (state: UserState) => {
    return state.user?.token;
  }
);
