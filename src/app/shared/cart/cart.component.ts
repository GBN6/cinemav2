import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketState } from '../services/state.interface';
import { TicketStateService } from '../services/ticket.state.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, CartItemComponent, RouterModule],
})
export class CartComponent {
  private ticketService = inject(TicketStateService);
  private cartService = inject(CartService);

  ticketState$ = this.ticketService.ticketState$;

  cartStatus = false;

  cartModal() {
    if (this.cartStatus) {
      return 'open-cart';
    } else {
      return 'close-cart';
    }
  }

  closeCart() {
    this.cartService.closeCart();
  }

  cartOverlayClass() {
    if (this.cartStatus) {
      return 'open-overlay';
    } else {
      return 'close-overlay';
    }
  }

  getFullPrice(tickets: TicketState[]) {
    return tickets.reduce((total, price) => {
      return (total += price.seat.price);
    }, 0);
  }
}
