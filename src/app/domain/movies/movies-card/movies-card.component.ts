import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
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

  authState = this.store.select((state) => state.auth);
  selectedDate$ = this.selectedMovieService.stateSelectedDate$;

  showLongDescription = false;
  isRatingModalVisible = false;

  showDescription() {
    this.showLongDescription = !this.showLongDescription;
  }

  howRatingModal() {
    this.isRatingModalVisible = true;
  }

  closeRatingModal() {
    this.isRatingModalVisible = false;
  }
}
