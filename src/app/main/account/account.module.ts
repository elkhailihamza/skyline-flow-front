import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from './account.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FollowService } from '../follow/follow.service';
import { FollowModule } from "../follow/follow.module";
import { FollowComponent } from '../follow/follow/follow.component';

@NgModule({
  declarations: [
    ViewAccountComponent,
    CreateAccountComponent,
    ViewAccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FollowModule
],
  providers: [
    AccountService,
    FollowService
  ]
})
export class AccountModule { }
