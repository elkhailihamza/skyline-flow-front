import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthState } from "../reducers/auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectUserIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoggedIn
);

export const selectUserLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectUserError = createSelector(
  selectAuthState,
  () => {}
);
