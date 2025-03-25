import { Component, DestroyRef, Input, signal, WritableSignal } from '@angular/core';
import { FollowService } from '../follow.service';
import { Account } from '../../interface/account';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.css'
})
export class FollowComponent {
  @Input() account!: Account;
  isFollowing: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(true);

  constructor(private followService: FollowService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.isFollowingAccount();
  }

  isFollowingAccount() {
    if (this.account) {
      this.followService.isFollowing(this.account).pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(data => {
          this.isFollowing.set(data);
          this.isLoading.set(false);
        })
      ).subscribe()
    }
  }

  followAccount() {
    this.isLoading.set(true);
    if (this.account) {
      this.followService.followAccount(this.account).pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {
          this.isFollowing.set(true);
          this.account.followerCount!++;
          this.isLoading.set(false);
        })
      ).subscribe();
    }
  }

  unfollowAccount() {
    this.isLoading.set(true);
    if (this.account) {
      this.followService.unFollowAccount(this.account).pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {
          this.isFollowing.set(false);
          this.account.followerCount!--;
          this.isLoading.set(false);
        })
      ).subscribe();
    }
  }
}
