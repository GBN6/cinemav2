import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  private builder = inject(NonNullableFormBuilder);

  forgotPassword = false;
  invalidUser = false;

  passwordRecover() {
    this.forgotPassword = !this.forgotPassword;
  }

  loginForm = this.builder.group({
    userEmail: this.builder.control('', {
      validators: [Validators.required],
    }),
    userPassword: this.builder.control('', {
      validators: [Validators.required],
    }),
  });

  onLogIn() {
    this.loginForm.markAllAsTouched;

    if (this.loginForm.invalid) {
      return;
    }
  }
}
