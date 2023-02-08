import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { AuthActions } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterModule, CommonModule, FontAwesomeModule],
})
export class NavbarComponent {
  private store = inject<Store<AppState>>(Store);
  authState = this.store.select((state) => state.auth);

  cart = faCartShopping;

  

  handleLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
