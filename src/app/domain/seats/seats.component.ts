import { Component, inject } from '@angular/core';
import { mergeMap, tap } from 'rxjs';
import { SelectedShowStatfullService } from 'src/app/shared/services/selectedShow.statefull.service';
import { SelectedMovieStatfullService } from '../../shared/services/selectedMovie.statefull.service';
import { Show } from '../movies/movies.interface';
import { SeatsService } from './seats.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.html'],
})
export class SeatsComponet {
  private selectedMovieService = inject(SelectedMovieStatfullService);
  private selectedShowService = inject(SelectedShowStatfullService);
  private seatsService = inject(SeatsService);

  selectedMovie$ = this.selectedMovieService.selectedMovie$;
  selectedShow$ = this.selectedShowService.selectedShow$;
  selectedDate = this.selectedMovieService.selectedDate;
  screen = this.selectedShowService.getScreenFromCurrentShow()?.screen;

  rows: string[] = [];
  cols: number[] = [];

  styleGrid(number: number) {
    return { 'grid-template-columns': `repeat(${number}, 1fr)` };
  }

  getStatus(show: Show, seatPos: string) {
    if (show.reservedSeats.indexOf(seatPos) !== -1) {
      return 'reserved';
    }
    // else if (this.selected.indexOf(seatPos) !== -1) {
    //   return 'selected';
    // } else if (this.screen.specialSeats.indexOf(seatPos) !== -1) {
    //   return 'special';
    // }
    return 'freeSeat';
  }

  ngOnInit() {
    this.seatsService
      .getScreen('A')
      .pipe(
        tap((item) => item),
        mergeMap((item) => item)
      )
      .subscribe((item) => {
        this.rows = [...Array(item.rows).keys()].map((i) =>
          String.fromCharCode(i + 65)
        );
        this.cols = [...Array(item.colu).keys()].map((i) => i + 1);
        console.log(this.rows);
      });
  }
}
