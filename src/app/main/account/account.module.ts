import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from './account.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ViewAccountComponent,
    CreateAccountComponent,
    ViewAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
