import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadUserInfo, loadUserSuccess, loadUserFailure } from '../actions/auth.action';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/interface/user';

@Injectable()
export class AuthEffect {
    
    constructor(private actions$: Actions, private authService: AuthService) {}

    loadUserInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUserInfo),
            mergeMap(() =>
                this.authService.getUserInfo().pipe( 
                    map((user: User) => loadUserSuccess({ user })),
                    catchError((error) => of(loadUserFailure({ error: error.message })))
                )
            )
        )
    );
} 