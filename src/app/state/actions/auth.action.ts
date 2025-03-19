import { createAction, props } from '@ngrx/store';
import { User } from '../../auth/interface/user';

export const loadUserInfo = createAction('[Auth] Load User Info');
export const loadUserSuccess = createAction('[Auth] Load User Info Success', props<{ user: User }>());
export const loadUserFailure = createAction('[Auth] Load User Info Failure', props<{ error: any }>());
