import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowService } from './follow.service';
import { FollowComponent } from './follow/follow.component';



@NgModule({
  declarations: [
    FollowComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    FollowService
  ],
  exports: [
    FollowComponent,
  ]
})
export class FollowModule { }
