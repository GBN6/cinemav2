import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { MoviesCard, Show } from '../../domain/movies/movies.interface';
import { MovieState, SelectedDate } from './state.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedMovieStatfullService {
  private movieState$$ = new BehaviorSubject<MovieState>({
    selectedDate: { id: 0, date: '' },
  } as MovieState);

  get movieState$() {
    return this.movieState$$.asObservable();
  }

  get stateSelectedDate$() {
    return this.movieState$$.pipe(map((state) => state.selectedDate));
  }

  get ScreenNameFromShow$() {
    return this.movieState$$.pipe(map((state) => state.selectedShow.screen));
  }

  addNewSelectedDate(date: SelectedDate) {
    this.movieState$$.next({ ...this.movieState$$.value, selectedDate: date });
  }

  addNewSelectedState(movie: MoviesCard, show: Show) {
    this.movieState$$.next({
      ...this.movieState$$.value,
      selectedMovie: movie,
      selectedShow: show,
    });
  }

  clearMovieAndShowState() {
    this.movieState$$.next({} as MovieState);
  }
}
