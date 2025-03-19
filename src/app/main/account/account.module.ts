import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from './account.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';

@NgModule({
  declarations: [
    ViewAccountComponent,
    CreateAccountComponent,
    ViewAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
