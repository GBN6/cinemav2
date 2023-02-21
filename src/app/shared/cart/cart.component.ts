import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from 'src/app/domain/order/order.service';
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
  private orderService = inject(OrderService);

  ticketState$ = this.ticketService.ticketState$;
  cartStatus$ = this.cartService.cartStatus$;
  discountState$ = this.orderService.discount$;

  cartModal(cartstatus: boolean) {
    if (cartstatus) {
      return 'open-cart';
    } else {
      return 'close-cart';
    }
  }

  closeCart() {
    this.cartService.closeCart();
  }

  cartOverlayClass(cartStatus: boolean) {
    if (cartStatus) {
      return 'open-overlay';
    } else {
      return 'close-overlay';
    }
  }

  getFullPrice(tickets: TicketState[], discount?: number) {
    let fullPrice = tickets.reduce((total, price) => {
      return (total += +price.seat.price);
    }, 0);

    if (!discount) return fullPrice;
    if (fullPrice - discount < 0) return 0;
    return fullPrice - discount;
  }
}
