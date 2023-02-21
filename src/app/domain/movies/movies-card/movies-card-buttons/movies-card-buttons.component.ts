import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, take } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { MoviesCard } from '../../movies.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserMovieRatingComponent } from '../user-movie-rating/user-movie-rating.component';
import { UserMovieRateService } from '../user-movie-rating/user-movie-rating.service';
import { UserWatchlistService } from 'src/app/domain/user/user-watchlist/user-watchlist.service';
import { WatchlistActions } from 'src/app/domain/user/user-watchlist/store/watchlist.actions';
import { ErrorhandlerService } from 'src/app/core/interceptor/error-handler.service';

@Component({
  selector: 'app-movies-card-buttons[movieCard][userId]',
  templateUrl: './movies-card-buttons.component.html',
  styleUrls: ['./movies-card-buttons.component.scss'],
  providers: [UserMovieRateService],
})
export class MoviesCardButtonsComponent {
  @Input() movieCard!: MoviesCard;
  @Input() userId!: number;

  private userWishlistService = inject(UserWatchlistService);
  private store = inject<Store<AppState>>(Store);
  private dialogWindow = inject(MatDialog);
  private userMovieRateService = inject(UserMovieRateService);
  private errorService = inject(ErrorhandlerService);

  isMovieInWatchList$: Observable<boolean | null> = of(null);
  userMovieRateState$ = this.userMovieRateService.ratingState$;
  errorHandler$ = this.errorService.error$;

  userRate: number = 0;

  openDialog() {
    const dialogRef = this.dialogWindow.open(UserMovieRatingComponent, {
      panelClass: 'rating-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (!result) return;
      this.userRate = result;
      this.userMovieRateService.updateRating(this.userRate);
      this.userMovieRateService.submitRating().subscribe();
    });
  }

  addMovieToWishList() {
    this.store.dispatch(
      WatchlistActions.addMovieToWatchlist({
        userId: this.userId,
        userWatchlist: { id: 0, movies: this.movieCard, userId: this.userId },
      })
    );
  }

  removeMovieFromWishList() {
    this.userWishlistService
      .findUserWatchListId(this.userId, this.movieCard.movieId)
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.store.dispatch(
            WatchlistActions.removeMovieFromWatchlist({
              userWatchListId: result.id,
            })
          );
        }
      });
  }

  ngOnInit() {
    this.isMovieInWatchList$ = this.userWishlistService.isMovieInWachlist(
      this.movieCard.movieId
    );
    this.userMovieRateService.fetchRating(this.movieCard.movieId);
  }
}
