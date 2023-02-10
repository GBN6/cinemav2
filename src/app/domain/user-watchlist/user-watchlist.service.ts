import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { WatchlistActions } from './store/watchlist.actions';
import { UserWatchList } from './user-watchlist.interface';

@Injectable({
  providedIn: 'root',
})
export class UserWatchlistService {
  private http = inject(HttpClient);
  private store = inject<Store<AppState>>(Store);

  private apiUrl = 'http://localhost:3000';

  getUserWatchlist(userId: number) {
    this.http
      .get<UserWatchList[]>(this.apiUrl + `/users/${userId}/userWatchList`)
      .subscribe((result) => {
        console.log(result);
        this.store.dispatch(
          WatchlistActions.addWatchlist({ userWatchList: result })
        );
      });
  }

  addMovieToWatchList(userId: number, movie: UserWatchList) {
    this.http
      .post<UserWatchList>(
        this.apiUrl + `/users/${userId}/userWatchList`,
        movie
      )
      .subscribe((result) => {
        this.store.dispatch(WatchlistActions.addMovieToWatchlist(result));
      });
  }

  removeMovieFromWatchList(userWatchListId: number) {
    this.http
      .delete(this.apiUrl + `/userWatchList/${userWatchListId}`)
      .subscribe(() => {
        this.store.dispatch(
          WatchlistActions.removeMovieFromWatchlist({ userWatchListId })
        );
      });
  }

  isMovieInWachlist(movieId: number) {
    return this.store.select((state) => {
      return state.userWatchList.userWatchlist.some(
        (watchlist) => watchlist.id !== movieId
      );
    });
  }
}
