import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { createAccountGuard } from './create-account/create-account.guard';

const routes: Routes = [
  {
    path: 'create',
    component: CreateAccountComponent,
    canActivate: [createAccountGuard]
  },
  {
    path: ':id',
    component: ViewAccountComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
