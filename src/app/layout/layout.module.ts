import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutService } from './layout.service';
import { AuthNavbarComponent } from './auth/navbar/auth-navbar.component';
import { MainNavbarComponent } from './main/main-navbar/main-navbar.component';
import { AuthFooterComponent } from './auth/footer/auth-footer/auth-footer.component';

@NgModule({
  declarations: [
    MainNavbarComponent,
    AuthNavbarComponent,
    AuthFooterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    LayoutService
  ],
  exports: [
    MainNavbarComponent,
    AuthNavbarComponent,
    AuthFooterComponent
  ]
})
export class LayoutModule { }
