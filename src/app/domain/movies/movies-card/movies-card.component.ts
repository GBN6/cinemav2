import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { ErrorhandlerService } from 'src/app/core/interceptor/error-handler.service';
import { SelectedMovieStatfullService } from 'src/app/shared/services/selected-movie.state.service';
import { MoviesCard } from '../movies.interface';

@Component({
  selector: 'app-movies-card[movieCard]',
  templateUrl: './movies-card.component.html',
  styleUrls: ['./movies-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesCardComponent {
  @Input() movieCard!: MoviesCard;
  private selectedMovieService = inject(SelectedMovieStatfullService);
  private store = inject<Store<AppState>>(Store);
  private errorService = inject(ErrorhandlerService);

  authState = this.store.select((state) => state.auth);
  selectedDate$ = this.selectedMovieService.stateSelectedDate$;
  errorHandler$ = this.errorService.error$;

  showLongDescription = false;

  showDescription() {
    this.showLongDescription = !this.showLongDescription;
  }
}
