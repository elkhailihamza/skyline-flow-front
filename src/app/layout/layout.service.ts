import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Search } from './interface/navbar';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserShortDetails } from '../auth/interface/user';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  userShortDetails: WritableSignal<UserShortDetails | null> = signal(null);

  constructor(private http: HttpClient) { }

  search(search: Search) {

  }

  fetchUserInfo(): Observable<UserShortDetails | null> {
    return this.http.get<UserShortDetails>("user/short_details");
  }
}
