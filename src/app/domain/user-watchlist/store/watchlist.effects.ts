import { state } from '@angular/animations';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, take, tap } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { UserWatchlistService } from '../user-watchlist.service';
import { WatchlistActions, WatchlistAPIActions } from './watchlist.actions';

@Injectable({
  providedIn: 'root',
})
export class userWatchlistEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private store = inject<Store<AppState>>(Store);
  private userWatchlistService = inject(UserWatchlistService);

  addMovieToWatchlistEffect$ = createEffect(() => {
    this.actions$.pipe(
      ofType(WatchlistActions.addMovieToWatchlist),
      switchMap((action) => {
        const { userId, userWatchlist } = action;
        return this.userWatchlistService
          .addMovieToWatchList(userId, userWatchlist)
          .pipe(map((result) => WatchlistActions.addMovieToWatchlist(result)));
      })
    );
  });
}
