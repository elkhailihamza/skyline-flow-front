import { Component, DestroyRef, signal, WritableSignal } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../interface/account';
import { ImageHandlerService } from '../../../image-handler/image-handler.service';
import { map, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../auth/interface/user';
import { AuthService } from '../../../auth/auth.service';
import { Store } from '@ngrx/store';
import { selectUser, selectUserIsLoggedIn } from '../../../state/selectors/auth.selectors';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.css'
})
export class ViewAccountComponent {
  account!: Account;
  user$: Observable<User | null>;
  isAuth$: Observable<boolean>;
  initialLoad: WritableSignal<boolean> = signal(false);
  secondaryLoad: WritableSignal<boolean> = signal(false);
  thirdLoad: WritableSignal<boolean> = signal(false);
  isFollowing: boolean = false;

  constructor(private accountService: AccountService, private route: ActivatedRoute, private imageService: ImageHandlerService, private destroyRef: DestroyRef, private store: Store) {
    this.user$ = this.store.select(selectUser);
    this.isAuth$ = this.store.select(selectUserIsLoggedIn);
  }

  ngOnInit(): void {
    this.setAccount();
  }

  setAccount() {
    this.route.data.subscribe(data => {
      this.initialLoad.set(true);

      const { userPublicInfoDTO, ...accountWithoutUserDTO } = data['account'];
      this.account = { ...accountWithoutUserDTO, user: userPublicInfoDTO };

      if (this.account.profilePicture) {
        this.imageService.loadImage({image: null, imageName: this.account.profilePicture})
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          map(pfp => {
            this.account.profilePicture = pfp!;
            this.secondaryLoad.set(true);
          })
        )
        .subscribe();
      } else {
        this.secondaryLoad.set(true);
      }
    });
  }
}
