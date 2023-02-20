import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { MoviesCard } from 'src/app/domain/movies/movies.interface';
import { WatchlistActions } from '../store/watchlist.actions';

@Component({
  selector: 'app-user-watchlist-item[movie][userWatchListId]',
  standalone: true,
  templateUrl: './user-watchlist-item.component.html',
  styleUrls: ['./user-watchlist-item.component.scss'],
  imports: [CommonModule],
})
export class UserWatchListItemComponent {
  @Input() movie!: MoviesCard;
  @Input() userWatchListId!: number;

  private store = inject<Store<AppState>>(Store);

  removeMovieFromWatchlist() {
    this.store.dispatch(
      WatchlistActions.removeMovieFromWatchlist({
        userWatchListId: this.userWatchListId,
      })
    );
  }
}
