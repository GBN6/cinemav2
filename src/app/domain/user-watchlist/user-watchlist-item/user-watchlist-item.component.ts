import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MoviesCard } from '../../movies/movies.interface';
import { UserWatchlistService } from '../user-watchlist.service';

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

  private userWatchlistService = inject(UserWatchlistService);

  removeMovieFromWatchlist() {
    console.log('ashfkajsfjkasfakjs');
    this.userWatchlistService.removeMovieFromWatchList(this.userWatchListId);
  }
}
