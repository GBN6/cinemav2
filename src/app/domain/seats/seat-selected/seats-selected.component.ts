import { Component, inject, Input } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TicketState } from 'src/app/shared/services/state.interface';
import { TicketStateService } from 'src/app/shared/services/ticket.state.service';
import { Show } from '../../movies/movies.interface';

@Component({
  selector: 'app-seats-selected[show][ticket]',
  templateUrl: './seats-selected.component.html',
  styleUrls: ['./seats-selected.component.scss'],
})
export class SeatsSelectedComponent {
  @Input() ticket!: TicketState;
  @Input() show!: Show;

  private ticketStateService = inject(TicketStateService);

  trashCanIcon = faTrashCan;
  selectedTicket = '';

  isSelectedSeatSpecial() {
    return this.ticket.seat.special;
  }

  selectTicketPrice(selectedTicket: string) {
    let price = 0;
    this.show.priceList.forEach((ticket) => {
      if (ticket.type === selectedTicket) {
        if (this.isSelectedSeatSpecial()) {
          price = ticket.price + 5;
        } else {
          price = ticket.price;
        }
      }
    });
    return price;
  }

  handleTicketTypeChange(id: string, type: string, price: number) {
    this.ticketStateService.updateSeatTypeAndPrice(id, type, price);
    this.ticketStateService.ticketState$.subscribe(console.log);
  }

  removeTicket(seat: string, id: string) {
    this.ticketStateService.removeSeat(seat);
    this.ticketStateService.removeTicket(id);
    console.log('dsalhflashfsalfh');
    // console.log(id, seat);
    // this.ticketStateService.ticketState$.subscribe(console.log);
  }

  ngOnInit() {
    this.selectedTicket = this.ticket.seat.type;
  }
}
