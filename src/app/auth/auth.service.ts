import { HttpClient, HttpContext } from '@angular/common/http';
import { DestroyRef, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, take, tap } from 'rxjs';
import { User } from './interface/user';
import { Login, LoginResponse, LoginSuccess } from './interface/login';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IS_PUBLIC } from './auth.interceptor';
import { Store } from '@ngrx/store';
import { selectUser } from '../state/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = "auth";
  private readonly CONTEXT = {context: new HttpContext().set(IS_PUBLIC, true)};
  private readonly TOKEN_EXPIRY_THRESHOLD_MINUTES = 5;
  isLoading: WritableSignal<boolean> = signal(false);
  private userInfo$: Observable<User | null>;

  constructor(private readonly http: HttpClient, private readonly router: Router, private readonly destroyRef: DestroyRef,private readonly store: Store) {
    this.userInfo$ = this.store.select(selectUser);
  }

  get user(): Observable<User | null> {
    return this.userInfo$;
  }

  register(data: any): Observable<any> {
    this.isLoading.set(true);
    return this.http.post<LoginResponse>(`${this.BASE_URL}/register`, data, this.CONTEXT)
      .pipe(
        catchError(error => {
          if (error.status === 409) {
            console.error('Email already in use!');
          }
          this.isLoading.set(false);
          return EMPTY;
        }),
        tap(() => {
          this.isLoading.set(false);
          this.router.navigate(['/user/profile']);
        })
      );
  }

  login(data: Login): Observable<any> {
    this.isLoading.set(true);
    return this.http.post<LoginResponse>(`${this.BASE_URL}/login`, data, this.CONTEXT)
      .pipe(
        catchError(() => {
          this.isLoading.set(false);
          return EMPTY;
        }),
        tap(() => {
          this.isLoading.set(false);
          this.router.navigate(['/']);
        })
      );
  }

  logout(): void {
    this.http.post(`${this.BASE_URL}/logout`, {}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  refreshToken(): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/refresh`, {})
      .pipe(catchError(() => EMPTY));
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.BASE_URL}/check-auth`);
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/me`, this.CONTEXT);
  }

  scheduleTokenRefresh(token: string): void {
    if (this.isAuthenticated()) {
      setTimeout(() => {
        this.refreshToken()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }, 50 * 60 * 1000);
    }
  }
}
