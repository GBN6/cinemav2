import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { AuthActions } from 'src/app/auth/store/auth.actions';
import { TicketStateService } from '../services/ticket.state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterModule, CommonModule, FontAwesomeModule],
})
export class NavbarComponent {
  private store = inject<Store<AppState>>(Store);
  private ticketStateService = inject(TicketStateService);

  cart = faCartShopping;

  authState = this.store.select((state) => state.auth);
  ticketState$ = this.ticketStateService.ticketState$;

  handleLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
