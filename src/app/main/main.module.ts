import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { LayoutModule } from './layout/layout.module';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LayoutModule
  ]
})
export class MainModule { }
