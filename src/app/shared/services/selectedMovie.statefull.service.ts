import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MoviesCard } from '../../domain/movies/movies.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedMovieStatfullService {
  private selectedMovie$$ = new BehaviorSubject<MoviesCard | null>(null);
  private selectedDate$$ = new BehaviorSubject<string>('');

  get selectedDate() {
    let date = '';
    this.selectedDate$$.subscribe((result) => (date = result));
    return date;
  }

  get selectedMovie$() {
    return this.selectedMovie$$.asObservable();
  }

  addNewSelectedDate(date: string) {
    this.selectedDate$$.next(date);
  }

  addNewSelectedMovie(movie: MoviesCard) {
    this.selectedMovie$$.next(movie);
  }
}
