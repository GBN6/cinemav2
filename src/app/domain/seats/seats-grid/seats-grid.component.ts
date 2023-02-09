import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { TicketState } from 'src/app/shared/services/state.interface';
import { TicketStateService } from 'src/app/shared/services/ticket.state.service';
import { MoviesCard, Show } from '../../movies/movies.interface';
import { SeatsService } from '../seats.service';

@Component({
  selector: 'app-seats-grid[show][movie][date]',
  templateUrl: './seats-grid.component.html',
  styleUrls: ['./seats-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatsGridComponent {
  @Input() show!: Show;
  @Input() movie!: MoviesCard;
  @Input() date!: string;

  private seatsService = inject(SeatsService);
  private ticketService = inject(TicketStateService);

  screenGrid$ = this.seatsService.screenGrid$;
  selectedSeats$ = this.ticketService.selectedSeats$;

  private addToTicketState(id: string, position: string, special: boolean) {
    const ticketDTO: TicketState = {
      id: id,
      showId: this.show.id,
      date: this.date,
      hour: this.show.hour,
      movieTitle: this.movie.title,
      seat: {
        position: position,
        price: this.show.priceList[0].price,
        special: special,
        type: this.show.priceList[0].type,
      },
    };
    if (special) {
      ticketDTO.seat.price = ticketDTO.seat.price + 5;
    }
    this.ticketService.addTicket(ticketDTO);
  }

  styleGrid(number: number) {
    return { 'grid-template-columns': `repeat(${number}, 1fr)` };
  }

  getStatus(selectedSeats: string[], specialSeats: string[], seatPos: string) {
    if (this.show.reservedSeats.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (selectedSeats.indexOf(seatPos) !== -1) {
      return 'selected';
    } else if (specialSeats.indexOf(seatPos) !== -1) {
      return 'special';
    }
    return 'freeSeat';
  }

  seatClicked(
    selectedSeats: string[],
    specialSeats: string[],
    seatPos: string,
    id: string
  ) {
    let index = selectedSeats.indexOf(seatPos);
    if (index !== -1) {
      // seat already selected, remove
      this.ticketService.removeSeat(seatPos);
      this.ticketService.removeTicket(id);
      this.seatsService.cancelReservation(seatPos, this.show.id);
    } else {
      //push to selected array only if it is not reserved
      if (this.show.reservedSeats.indexOf(seatPos) === -1) {
        this.seatsService.reserveSeat(seatPos, this.show.id);
        if (specialSeats.indexOf(seatPos) !== -1) {
          this.ticketService.addSeat(seatPos);
          this.addToTicketState(id, seatPos, true);
        } else {
          this.ticketService.addSeat(seatPos);
          this.addToTicketState(id, seatPos, false);
        }
      }
    }
  }

  ngOnInit() {
    this.seatsService.getScreenRowsAndCols(this.show.screen);
  }
}
