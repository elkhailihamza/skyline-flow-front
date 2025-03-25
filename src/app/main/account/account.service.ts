import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account, AccountCreate } from '../interface/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly BASE_URL = "account";

  constructor(private http: HttpClient, private auth: AuthService, private store: Store) { }

  createAccount(data: FormData): Observable<any> {
    return this.http.post<AccountCreate>(`${this.BASE_URL}/create`, data);
  }

  fetchAccount(data: Account): Observable<Account> {
    return this.http.get<Account>(`${this.BASE_URL}/${data.username}`);
  }
}

