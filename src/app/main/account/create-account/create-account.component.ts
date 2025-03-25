import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../state/selectors/auth.selectors';
import { catchError, EMPTY, switchMap, take, tap } from 'rxjs';
import { loadUserInfo } from '../../../state/actions/auth.action';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  accountCreate: FormGroup;
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router, private store: Store) {
    this.accountCreate = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      profilePicture: [''],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => (this.imageUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    if (this.accountCreate.valid) {
    const formData = new FormData();
    formData.append('username', this.accountCreate.value.username);

    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }

    this.accountService.createAccount(formData).pipe(
      take(1),
      switchMap(() => {
        this.store.dispatch(loadUserInfo());
        return this.store.select(selectUser).pipe(
          take(1),
          catchError(() => {
            this.router.navigate(['/auth/login']);
            return EMPTY;
          })
        );
      })
    ).subscribe({
      next: (user) => {
        if (user?.account?.id) {
          this.router.navigate([`/account/${user.account.id}`]);
        }
      },
      error: (err) => {
        console.error('Error during account creation or user retrieval', err);
      }
    });
  }
}

  removeProfilePicture() {
    if (this.imageUrl) {
      this.imageUrl = null;
      this.selectedFile = null;
      this.accountCreate.patchValue({ profilePicture: '' });
    }
  }
}
