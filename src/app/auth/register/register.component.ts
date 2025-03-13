import { Component, computed, Signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordSameAsConfirmPassword } from '../../validator/PasswordSameAsConfirmPassword';
import { Register } from '../interface/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isLoading: Signal<boolean>;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.initializeForm();
    this.isLoading = computed(() => this.authService.isLoading());
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-z0-9_-]{3,50}$")]],
      surname: ['', [Validators.required, Validators.pattern("^[a-z0-9_-]{3,50}$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      ]],
      confirmPassword: ['']
    });

    this.registerForm.get('confirmPassword')?.setValidators([
      Validators.required,
      passwordSameAsConfirmPassword(this.registerForm.get("password")!)
    ]);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value as Register;
      this.authService.register(data).subscribe();
    }
  }
}
