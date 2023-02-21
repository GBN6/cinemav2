import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { ErrorComponent } from 'src/app/core/error/error.component';
import { ErrorhandlerService } from 'src/app/core/interceptor/error-handler.service';
import { MatLoaderComponent } from 'src/app/core/loader/loader.component';
import { UserWatchListItemComponent } from '../user-watchlist-item/user-watchlist-item.component';

@Component({
  selector: 'app-user-watchlist',
  standalone: true,
  templateUrl: './user-watchlist.component.html',
  styleUrls: ['./user-watchlist.component.scss'],
  imports: [
    CommonModule,
    UserWatchListItemComponent,
    MatLoaderComponent,
    ErrorComponent,
  ],
})
export default class userWatchListComponent {
  private store = inject<Store<AppState>>(Store);
  private errorService = inject(ErrorhandlerService);

  errorHandler$ = this.errorService.error$;

  userWatchlist$ = this.store.select(
    (state) => state.userWatchList.userWatchlist
  );
}
