import { createReducer, on } from '@ngrx/store';
import { loadUserFailure, loadUserInfo, loadUserSuccess } from '../actions/auth.action';
import { User } from '../../auth/interface/user';

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(loadUserInfo, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    loading: false,
    user  
  })),
  on(loadUserFailure, (state) => ({
    ...state,
    isLoggedIn: false,
    loading: false
  })),
);
