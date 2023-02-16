import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { selectUserId } from 'src/app/auth/store/auth.selectors';
import { Rate, RatingState } from '../../movies.interface';

@Injectable({
  providedIn: 'root',
})
export class UserMovieRateService {
  private store = inject<Store<AppState>>(Store);
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000';

  constructor() {
    this.store
      .select(selectUserId)
      .pipe(take(1))
      .subscribe((result) => {
        this.patchState({ userId: result });
      });
  }

  private userMovieRateState$$ = new BehaviorSubject<RatingState>({
    rating: 0,
    hasUserRated: false,
    movieId: null,
    userId: null,
  });

  get ratingState$() {
    return this.userMovieRateState$$.asObservable();
  }

  private patchState(stateSlice: Partial<RatingState>) {
    this.userMovieRateState$$.next({
      ...this.userMovieRateState$$.value,
      ...stateSlice,
    });
  }

  fetchRating(movieId: number) {
    this.patchState({ movieId: movieId });
    this.http
      .get<Rate[]>(
        `${this.apiUrl}/rating?movieId=${movieId}&userId=${this.userMovieRateState$$.value.userId}`
      )
      .subscribe({
        next: (result) => {
          if (result.length)
            this.patchState({ hasUserRated: true, rating: result[0].rate });
        },
      });
  }

  updateRating(rating: number) {
    this.patchState({ rating: rating });
  }

  submitRating() {
    return this.http
      .post(`${this.apiUrl}/rating`, {
        rate: this.userMovieRateState$$.value.rating,
        movieId: this.userMovieRateState$$.value.movieId,
        userId: this.userMovieRateState$$.value.userId,
      })
      .pipe(
        tap({
          next: () => {
            this.patchState({ hasUserRated: true });
          },
        })
      );
  }
}
