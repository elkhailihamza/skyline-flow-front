import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { Account } from '../interface/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private readonly BASE_URL = "follow";

  constructor(private http: HttpClient, private auth: AuthService, private store: Store) { }

  followAccount(data: Account): Observable<boolean> {
    return this.http.get<boolean>(`${this.BASE_URL}/${data.username}/follow`);
  }

  unFollowAccount(data: Account): Observable<boolean> {
    return this.http.get<boolean>(`${this.BASE_URL}/${data.username}/unfollow`);
  }

  isFollowing(data: Account): Observable<boolean> {
    return this.http.get<boolean>(`${this.BASE_URL}/${data.username}/isFollowing`);
  }
}
