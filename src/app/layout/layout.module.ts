import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutService } from './layout.service';
import { AuthNavbarComponent } from './auth/navbar/auth-navbar.component';
import { MainNavbarComponent } from './main/main-navbar/main-navbar.component';
import { AuthFooterComponent } from './auth/footer/auth-footer/auth-footer.component';
import { RouterModule } from '@angular/router';
import { MainContentComponent } from './main/main-content/main-content.component';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [
    MainNavbarComponent,
    AuthNavbarComponent,
    AuthFooterComponent,
    MainContentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    LayoutService,
    AuthService
  ],
  exports: [
    MainNavbarComponent,
    AuthNavbarComponent,
    AuthFooterComponent,
    MainContentComponent
  ]
})
export class LayoutModule { }
