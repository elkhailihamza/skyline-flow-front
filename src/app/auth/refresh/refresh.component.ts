import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrl: './refresh.component.css'
})
export class RefreshComponent {
  constructor(private auth: AuthService) {
    auth.refreshToken().pipe(take(1)).subscribe();
  }
}
