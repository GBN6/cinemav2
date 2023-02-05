import { MoviesCard, Show } from 'src/app/domain/movies/movies.interface';

export interface MovieState {
  selectedMovie: MoviesCard;
  selectedShow: Show;
  selectedDate: SelectedDate;
}

export interface SelectedDate {
  id: number;
  date: string;
}
