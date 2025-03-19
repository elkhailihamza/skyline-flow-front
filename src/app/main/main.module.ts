import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { ContentComponent } from './content/content.component';
import { LayoutModule } from '../layout/layout.module';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContentComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LayoutModule,
  ],
})
export class MainModule { }
