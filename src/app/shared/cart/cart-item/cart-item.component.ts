import { Component, inject, Input } from '@angular/core';
import { TicketState } from '../../services/state.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TicketStateService } from '../../services/ticket.state.service';
import { SeatsService } from 'src/app/domain/seats/seats.service';

@Component({
  selector: 'app-cart-item[ticket]',
  standalone: true,
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  imports: [FontAwesomeModule],
})
export class CartItemComponent {
  @Input() ticket!: TicketState;
  private ticketService = inject(TicketStateService);
  private seatsService = inject(SeatsService);

  trashCan = faTrashCan;

  removeTicketFromCart(seatPos: string, id: string, showId: number) {
    this.ticketService.removeSeat(seatPos);
    this.ticketService.removeTicket(id);
    this.seatsService.cancelReservation(seatPos, showId);
  }
}
