import { Component, DestroyRef, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '../../layout.service';
import { Search } from '../../interface/navbar';
import { map, tap } from 'rxjs';
import { User, UserShortDetails } from '../../../auth/interface/user';
import { Store } from '@ngrx/store';
import { selectUser, selectUserIsLoggedIn } from '../../../state/selectors/auth.selectors';
import { ImageHandlerService } from '../../../image-handler/image-handler.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent implements OnDestroy {
  searchBarNav: FormGroup;
  isFocused = false;
  hasInput = signal(false);
  isAuthenticated: boolean = false;
  userInfo: UserShortDetails | null = null;
  userInfoLoading: boolean = false;
  imageUrl: string | null = null;

  constructor(private formBuilder: FormBuilder, private layoutService: LayoutService, private store: Store, private imageService: ImageHandlerService,private destoryRef: DestroyRef) { 
    this.searchBarNav = this.formBuilder.group({
      search: ['', Validators.required]
    });

    this.searchBarNav.controls['search'].valueChanges.subscribe(value => {
      this.hasInput.set(value.length > 0);
    });
  }

  ngOnInit(): void {
    this.store.select(selectUserIsLoggedIn).pipe(
      takeUntilDestroyed(this.destoryRef),
      tap(data => {
        this.isAuthenticated = data;
      })
    ).subscribe();
  }

  onSubmit(): void {
    if (this.searchBarNav.valid) {
      const data = this.searchBarNav.value as Search;
      this.layoutService.search(data);
    }
  }

  fetchDropdownUserDetails(): void {
    this.layoutService.fetchUserInfo();
  }

  cancelSearch(event: MouseEvent): void {
    event.stopImmediatePropagation();
    this.searchBarNav.controls['search'].reset();
    this.hasInput.set(false);
  }

  onSearch(): void {
    this.isFocused = true;
  }

  offSearch(): void {
    setTimeout(() => this.isFocused = false, 50);
  }

  loadUserInfo() {
    this.userInfoLoading = true;
    this.store.select(selectUser).pipe(
      takeUntilDestroyed(this.destoryRef),
      map((user: User | null) => {
        if (!user) {return}
        this.userInfo = {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          accountPublicInfo: null
        }
        if (user.account) {
          this.userInfo = {
            ...this.userInfo,
            accountPublicInfo: {
              id: user.account.id,
              createdAt: user.account.createdAt,
              profilePicture: user.account.profilePicture,
              username: user.account.username
            }
          }
        }
      })
    ).subscribe();

    if (this.userInfo?.accountPublicInfo?.profilePicture != null) {
      this.imageService.loadImage({ image: null, imageName: this.userInfo?.accountPublicInfo?.profilePicture}).pipe(
        takeUntilDestroyed(this.destoryRef),
        tap(pfp => {
          this.imageUrl = pfp;
          console.log(pfp)
        })
      ).subscribe(() => {
        this.userInfoLoading = false;
      });
    } else {
      this.userInfoLoading = false;
    }
    this.userInfoLoading = false;
  }

  ngOnDestroy(): void {
    if (this.imageUrl) {
      this.imageService.revokeImageUrl(this.imageUrl);
    }
  }
}
