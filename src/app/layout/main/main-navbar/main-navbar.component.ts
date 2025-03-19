import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '../../layout.service';
import { Search } from '../../interface/navbar';
import { AuthService } from '../../../auth/auth.service';
import { map, Observable } from 'rxjs';
import { AccountShortDetails, User, UserShortDetails } from '../../../auth/interface/user';
import { Store } from '@ngrx/store';
import { selectUser, selectUserIsLoggedIn, selectUserLoading } from '../../../state/selectors/auth.selectors';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent {
  searchBarNav: FormGroup;
  isFocused: boolean = false;
  hasInput: WritableSignal<boolean> = signal(false);
  isAuthenticated$: Observable<boolean>;
  userInfo$: Observable<UserShortDetails | null>;
  userInfoLoading$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private layoutService: LayoutService, private auth: AuthService, private store: Store) { 
    this.searchBarNav = this.formBuilder.group({
      search: ['', Validators.required]
    })

    this.searchBarNav.controls['search'].valueChanges.subscribe(value => {
      this.hasInput.set(value.length > 0);
    });

    this.isAuthenticated$ = this.store.select(selectUserIsLoggedIn);
    this.userInfoLoading$ = this.store.select(selectUserLoading);
    this.userInfo$ = this.store.select(selectUser).pipe(
      map((user: User | null) => {
        if (user) {
            const accountPublicInfo: AccountShortDetails | null = user.account
            ? {
                id: user.account.id,
                username: user.account.username,
                profilePicture: user.account.profilePicture,
                createdAt: user.account.createdAt,
              }
          : null;
  

          return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            accountPublicInfo,
          };
        }
        return null;
      })
    );
  }

  onSubmit() {
    if (this.searchBarNav.valid) {
      const data = this.searchBarNav.value as Search;
      this.layoutService.search(data);
    }
  }

  fetchDropdownUserDetails() {
    this.layoutService.fetchUserInfo();
  }

  cancelSearch(event: MouseEvent) {
    event.stopImmediatePropagation();
    this.searchBarNav.controls['search'].reset();
    this.hasInput.set(false);
  }

  onSearch() {
    this.isFocused = true;
  }

  offSearch() {
    setTimeout(() => {
      this.isFocused = false;
    }, 50);
  }

}
