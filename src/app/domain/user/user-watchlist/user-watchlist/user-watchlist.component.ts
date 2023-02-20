import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { UserWatchListItemComponent } from '../user-watchlist-item/user-watchlist-item.component';

@Component({
  selector: 'app-user-watchlist',
  standalone: true,
  templateUrl: './user-watchlist.component.html',
  styleUrls: ['./user-watchlist.component.scss'],
  imports: [CommonModule, UserWatchListItemComponent],
})
export default class userWatchListComponent {
  private store = inject<Store<AppState>>(Store);

  userWatchlist$ = this.store.select(
    (state) => state.userWatchList.userWatchlist
  );
}
