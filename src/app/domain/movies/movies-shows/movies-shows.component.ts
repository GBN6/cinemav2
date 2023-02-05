import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SelectedMovieStatfullService } from 'src/app/shared/services/selectedMovie.statefull.service';
import { MoviesCard, Show } from '../movies.interface';
import { MovieShowsService } from './movies-shows.service';

@Component({
  selector: 'app-movies-shows[movie]',
  templateUrl: './movies-shows.component.html',
  styleUrls: ['./movies-shows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesShowsComponent {
  @Input() movie!: MoviesCard;

  private showsService = inject(MovieShowsService);
  private selectedStateService = inject(SelectedMovieStatfullService);

  shows$: Observable<Show[]> | null = null;

  handleSelectedMovieAndShow(movie: MoviesCard, show: Show) {
    this.selectedStateService.addNewSelectedState(movie, show);
  }

  ngOnInit() {
    this.shows$ = this.showsService.getShows(this.movie.id);
  }
}
