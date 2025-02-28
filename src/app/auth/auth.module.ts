import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './auth.service';
import { RefreshComponent } from './refresh/refresh.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    RefreshComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    LayoutModule
  ],
  providers: [
    AuthService,
    JwtHelperService
  ],
})
export class AuthModule { }
