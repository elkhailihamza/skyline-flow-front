import { Component, Input } from '@angular/core';
import { ContentData } from '../../interface/content';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  @Input() content!: ContentData;

}
