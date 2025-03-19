import { Component, Signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../interface/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: Signal<boolean>;
  hasBeenSubmitted: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isLoading = this.authService.isLoading;
  }

  onSubmit() {
    this.hasBeenSubmitted = true;
    if (this.loginForm.valid) {
      const data = this.loginForm.value as Login;
      this.authService.login(data).subscribe();
    }
  }
}
