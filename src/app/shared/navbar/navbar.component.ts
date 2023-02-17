import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { AuthActions } from 'src/app/auth/store/auth.actions';
import { TicketStateService } from '../services/ticket.state.service';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';

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
  private cartService = inject(CartService);
  private subscriptions = new Subscription();

  cart = faCartShopping;

  authState = this.store.select((state) => state.auth);
  ticketState$ = this.ticketStateService.ticketState$;
  cartStatus: boolean = false;

  getToday() {
    const date = new Date();
    return (date.getDay() - 1).toString();
  }

  openCart() {
    if (this.cartStatus) {
      this.cartService.closeCart();
    } else {
      this.cartService.openCart();
    }
  }

  getCartStatus() {
    const sub = this.cartService.cartStatus$.subscribe(({ cartOpen }) => {
      this.cartStatus = cartOpen;
    });

    this.subscriptions.add(sub);
  }

  handleLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnInit() {
    this.getCartStatus();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
