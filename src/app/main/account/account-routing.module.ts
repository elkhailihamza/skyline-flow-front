import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { createAccountGuard } from './create-account/create-account.guard';
import { viewAccountResolver } from './view-account/view-account.resolver';

const routes: Routes = [
  {
    path: 'create',
    component: CreateAccountComponent,
    canActivate: [createAccountGuard],
  },
  {
    path: ':username',
    component: ViewAccountComponent,
    resolve: { account: viewAccountResolver }
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
