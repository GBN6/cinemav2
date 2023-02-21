import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserWatchlistService } from '../user-watchlist.service';
import { WatchlistActions, WatchlistAPIActions } from './watchlist.actions';

@Injectable({
  providedIn: 'root',
})
export class userWatchlistEffects {
  private actions$ = inject(Actions);
  private userWatchlistService = inject(UserWatchlistService);

  addMovieToWatchlistEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchlistActions.addMovieToWatchlist),
      switchMap((action) => {
        const { userId, userWatchlist } = action;
        return this.userWatchlistService
          .addMovieToWatchList(userId, userWatchlist)
          .pipe(
            map((result) => {
              return WatchlistAPIActions.addMovieToWatchlistSuccess({
                userWatchlist: result,
              });
            }),
            catchError((error) => {
              console.log(error);
              return of(WatchlistAPIActions.addMovieToWatchlistFailure);
            })
          );
      })
    )
  );

  fetchUserWatchlistEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchlistActions.addWatchlist),
      switchMap((action) => {
        return this.userWatchlistService.getUserWatchlist(action.userId).pipe(
          map((result) => {
            return WatchlistAPIActions.fetchUserwacthlistSuccess({
              userWatchList: result,
            });
          }),
          catchError((error) => {
            console.log(error);
            return of(WatchlistAPIActions.fetchUserwacthlistFailure);
          })
        );
      })
    )
  );

  removeMovieFromWatchlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchlistActions.removeMovieFromWatchlist),
      switchMap((action) => {
        const { userWatchListId } = action;
        return this.userWatchlistService
          .removeMovieFromWatchList(userWatchListId)
          .pipe(
            map(() => {
              return WatchlistAPIActions.removeMovieFromWatchlistSuccess({
                userWatchListId: userWatchListId,
              });
            }),
            catchError((error) => {
              console.log(error);
              return of(WatchlistAPIActions.removeMovieFromWatchlistFailure);
            })
          );
      })
    )
  );
}
