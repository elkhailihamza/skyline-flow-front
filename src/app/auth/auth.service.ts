import { HttpClient, HttpContext } from '@angular/common/http';
import { DestroyRef, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { User } from './interfaces/user';
import { Login, LoginResponse, LoginSuccess } from './interfaces/login';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IS_PUBLIC } from './auth.interceptor';
import { JwtutilService } from '../util/jwtutil.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = "auth";
  private readonly CONTEXT = {context: new HttpContext().set(IS_PUBLIC, true)};
  private readonly TOKEN_EXPIRY_THRESHOLD_MINUTES = 5;
  isLoading = false;

  constructor(private readonly http: HttpClient, 
    private readonly router: Router, 
    private readonly jwtHelper: JwtHelperService, 
    private readonly destroyRef: DestroyRef,
    private readonly jwtUtil: JwtutilService) { }

  get user(): WritableSignal<User | null> {
    const token = localStorage.getItem('token');
    if (!this.jwtUtil.isJwtValid(token!) && token) {
      localStorage.setItem('token', '');
      return signal(null);
    }
    return signal(token ? this.jwtHelper.decodeToken(token) : null);
  }

  register(data: any): Observable<any> {
    this.isLoading = true;
    return this.http.post<LoginResponse>(`${this.BASE_URL}/register`, data, this.CONTEXT)
    .pipe(
      catchError(error => {
        if (error.status === 409) {
          console.error('Email already in use!');
        }
        this.isLoading = false;
        return EMPTY;
      }), 
      tap(() => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
      })
    );
  }

  login (data: Login): Observable<any> {
    this.isLoading = true;
    return this.http.post<LoginResponse>(`${this.BASE_URL}/login`, data, this.CONTEXT)
      .pipe(
        catchError(error => {
        if (error.status === 401) {
          console.error('Invalid credentials');
        }
        this.isLoading = false;
        return EMPTY;
      }),
      tap(data => {
        const loginSuccessData = data as LoginSuccess;
        this.stockTokens(loginSuccessData);
        this.scheduleTokenRefresh(loginSuccessData.token);
        this.isLoading = false;
        this.router.navigate(['/dashboard/home']);
      })
    )
  }

  logout(): void {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expiration_date');
    }
    this.router.navigate(['/auth/login']);
  }

  stockTokens (data: LoginSuccess): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('refresh_token', data.refreshToken);
    localStorage.setItem('expiration_date', data.expirationDate);
  }

  refreshToken(): Observable<LoginResponse | null> {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) {
      location.reload();
      return EMPTY;
    }

    return this.http.post<LoginResponse>(`${this.BASE_URL}/token/refresh`, {refreshToken: refresh_token}, this.CONTEXT)
      .pipe(
        catchError(() => EMPTY),
        tap(data => {
          const loginSuccessData = data as LoginSuccess;
          this.stockTokens(loginSuccessData);
          this.scheduleTokenRefresh(loginSuccessData.token);
        })
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token && this.jwtUtil.isJwtValid(token!)) {
      return !this.jwtHelper.isTokenExpired();
    }
    return false;
  }

  scheduleTokenRefresh(token: string): void {
    const expirationTime = this.jwtHelper.getTokenExpirationDate(token)?.getTime();
    const refreshTime = expirationTime ? expirationTime - this.TOKEN_EXPIRY_THRESHOLD_MINUTES * 60 * 1000 : Date.now();
    const refreshInterval = refreshTime - Date.now();

    if (refreshInterval > 0) {
      setTimeout(() => {
        this.refreshToken()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }, refreshInterval);
    }
  }
}
