import { Component, inject, Input } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { UserWatchlistService } from 'src/app/domain/user-watchlist/user-watchlist.service';
import { MoviesCard } from '../../movies.interface';

@Component({
  selector: 'app-movies-card-buttons[movieCard][userId]',
  templateUrl: './movies-card-buttons.component.html',
  styleUrls: ['./movies-card-buttons.component.scss'],
})
export class MoviesCardButtonsComponent {
  @Input() movieCard!: MoviesCard;
  @Input() userId!: number;

  private userWishlistService = inject(UserWatchlistService);

  isMovieInWatchList$: Observable<boolean | null> = of(null);

  addMovieToWishList() {
    this.userWishlistService.addMovieToWatchList(this.userId, {
      id: 0,
      movies: this.movieCard,
      userId: this.userId,
    });
  }

  removeMovieFromWishList() {
    this.userWishlistService
      .findUserWatchListId(this.userId, this.movieCard.id)
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.userWishlistService.removeMovieFromWatchList(result.id);
        }
      });
  }

  ngOnInit() {
    this.isMovieInWatchList$ = this.userWishlistService.isMovieInWachlist(
      this.movieCard.id
    );
  }
}
