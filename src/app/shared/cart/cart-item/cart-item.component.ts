import { Component, inject, Input } from '@angular/core';
import { TicketState } from '../../services/state.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TicketStateService } from '../../services/ticket.state.service';
import { SeatsService } from 'src/app/domain/seats/seats.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item[ticket][ticketArrayLength]',
  standalone: true,
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  imports: [FontAwesomeModule, CommonModule],
  providers: [SeatsService],
})
export class CartItemComponent {
  @Input() ticket!: TicketState;
  @Input() ticketArrayLength!: number;

  private router = inject(Router);

  private ticketService = inject(TicketStateService);
  private seatsService = inject(SeatsService);

  trashCan = faTrashCan;

  removeTicketFromCart(seatPos: string, id: string, showId: number) {
    this.ticketService.removeSeat(seatPos);
    this.ticketService.removeTicket(id);
    this.seatsService.cancelReservation(seatPos, showId);
    console.log(this.ticketArrayLength);
    if (this.ticketArrayLength === 1) {
      this.router.navigate(['']);
    }
  }
}
