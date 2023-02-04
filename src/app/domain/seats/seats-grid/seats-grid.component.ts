import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { mergeMap } from 'rxjs';
import { Show } from '../../movies/movies.interface';
import { Screen } from '../seats.interface';
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
  private selectedSeats = this.seatsService.selectedSeats;
  screen: Screen = {} as Screen;
  rows!: string[];
  cols!: number[];

  styleGrid(number: number) {
    return { 'grid-template-columns': `repeat(${number}, 1fr)` };
  }

  getStatus(screen: Screen, seatPos: string) {
    if (this.show.reservedSeats.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selectedSeats.indexOf(seatPos) !== -1) {
      return 'selected';
    } else if (screen.specialSeats.indexOf(seatPos) !== -1) {
      return 'special';
    }
    return 'freeSeat';
  }

  seatClicked(seatPos: string) {
    let index = this.selectedSeats.indexOf(seatPos);
    if (index !== -1) {
      // seat already selected, remove
      this.seatsService.removeSeat(seatPos);
    } else {
      //push to selected array only if it is not reserved
      if (this.show.reservedSeats.indexOf(seatPos) === -1) {
        if (this.screen.specialSeats.indexOf(seatPos) !== -1) {
          this.seatsService.addSeat(seatPos);
        } else {
          this.seatsService.addSeat(seatPos);
        }
      }
    }
    console.log('csjkahdjsakdhskj');
  }

  ngOnInit() {
    this.seatsService
      .getScreen(this.show.screen)
      .pipe(mergeMap((item) => item))
      .subscribe((item) => {
        this.screen = item;
        this.rows = this.seatsService.getRowsArray(this.screen.rows);
        this.cols = this.seatsService.getColumnsArray(this.screen.colu);
      });
  }
}
