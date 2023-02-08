import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { AuthActions } from '../store/auth.actions';
import { selectAuthLoader } from '../store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  private builder = inject(NonNullableFormBuilder);
  private store = inject<Store<AppState>>(Store);

  forgotPassword = false;
  invalidUser = false;

  authLoading$ = this.store.select(selectAuthLoader);

  passwordRecover() {
    this.forgotPassword = !this.forgotPassword;
  }

  loginForm = this.builder.group({
    email: this.builder.control('', {
      validators: [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,7}$'),
      ],
    }),
    password: this.builder.control('', {
      validators: [Validators.required],
    }),
  });

  onLogIn() {
    this.loginForm.markAllAsTouched;

    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(AuthActions.login(this.loginForm.getRawValue()));
  }
}
