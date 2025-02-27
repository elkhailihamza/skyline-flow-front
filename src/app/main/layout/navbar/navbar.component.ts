import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '../layout.service';
import { Search } from '../interface/navbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchBarNav: FormGroup;
  isFocused: boolean = false;
  hasInput: WritableSignal<boolean> = signal(false);

  constructor(private formBuilder: FormBuilder, private layoutService: LayoutService) { 
    this.searchBarNav = this.formBuilder.group({
      search: ['', Validators.required]
    })

    this.searchBarNav.controls['search'].valueChanges.subscribe(value => {
      this.hasInput.set(value.length > 0);
    });
  }

  onSubmit() {
    if (this.searchBarNav.valid) {
      const data = this.searchBarNav.value as Search;
      this.layoutService.search(data);
    }
  } 

  cancelSearch(event: MouseEvent) {
    event.stopImmediatePropagation();
    this.searchBarNav.controls['search'].reset();
    this.hasInput.set(false);
  }

  onSearch() {
    this.isFocused = true;
  }

  offSearch() {
    setTimeout(() => {
      this.isFocused = false;
    }, 50);
  }
}
