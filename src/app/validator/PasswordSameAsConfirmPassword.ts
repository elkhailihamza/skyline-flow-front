import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordSameAsConfirmPassword = (password: AbstractControl): ValidatorFn => {
  return (confirmPassword: AbstractControl): ValidationErrors | null => {
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    if (!confirmPasswordValue) {
      return null;
    }

    if (passwordValue !== confirmPasswordValue) {
      return { passwordMismatch: true };
    }

    return null;
  };
};
