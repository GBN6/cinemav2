import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { TicketStateService } from 'src/app/shared/services/ticket.state.service';
import { Show } from '../../movies/movies.interface';
import { Screen, ScreenGrid } from '../seats.interface';
import { SeatsService } from '../seats.service';

@Component({
  selector: 'app-seats-grid[show]',
  templateUrl: './seats-grid.component.html',
  styleUrls: ['./seats-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatsGridComponent {
  @Input() show!: Show;

  private seatsService = inject(SeatsService);
  private selectedSeatsService = inject(TicketStateService);
  screenGrid$ = this.seatsService.screenGrid$;
  selectedSeats$ = this.selectedSeatsService.selectedSeats$;

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
    seatPos: string
  ) {
    let index = selectedSeats.indexOf(seatPos);
    if (index !== -1) {
      // seat already selected, remove
      this.selectedSeatsService.removeSeat(seatPos);
    } else {
      //push to selected array only if it is not reserved
      if (this.show.reservedSeats.indexOf(seatPos) === -1) {
        if (specialSeats.indexOf(seatPos) !== -1) {
          this.selectedSeatsService.addSeat(seatPos);
        } else {
          this.selectedSeatsService.addSeat(seatPos);
        }
      }
    }
  }

  ngOnInit() {
    this.seatsService.getScreenRowsAndCols(this.show.screen);
  }
}
