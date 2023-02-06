import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SelectedMovieStatfullService } from 'src/app/shared/services/selectedMovie.statefull.service';
import { SelectedDate } from 'src/app/shared/services/state.interface';
import { TicketStateService } from 'src/app/shared/services/ticket.state.service';
import { MoviesCard, Show } from '../movies.interface';
import { MovieShowsService } from './movies-shows.service';

@Component({
  selector: 'app-movies-shows[movie][date]',
  templateUrl: './movies-shows.component.html',
  styleUrls: ['./movies-shows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesShowsComponent {
  @Input() movie!: MoviesCard;
  @Input() date!: SelectedDate;

  private showsService = inject(MovieShowsService);
  private selectedStateService = inject(SelectedMovieStatfullService);
  private ticketStateService = inject(TicketStateService);

  shows$: Observable<Show[]> | null = null;

  handleSelectedMovieAndShow(
    movie: MoviesCard,
    show: Show,
    date: SelectedDate
  ) {
    this.selectedStateService.addNewSelectedState(movie, show);
    this.ticketStateService.checkIfSelectedMovieHasSelectedSeats(
      date,
      movie,
      show
    );
  }

  ngOnInit() {
    this.shows$ = this.showsService.getShows(this.movie.id);
  }
}
