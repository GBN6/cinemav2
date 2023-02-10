import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AuthState } from './auth/auth.interface';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './auth/store/auth.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { fetchLoggedUser } from './auth/fetchLoggedUser';
import { UserWatchlistInitialState } from './domain/user-watchlist/store/watchlist.state';
import { watchlistReducer } from './domain/user-watchlist/store/watchlist.reducer';

export interface AppState {
  auth: AuthState;
  userWatchList: UserWatchlistInitialState;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        children: [
          {
            path: 'login',
            loadChildren: () => import('./auth/auth.module'),
          },
          {
            path: '',
            loadChildren: () => import('./domain/home/home.module'),
          },
          {
            path: '**',
            redirectTo: '',
          },
        ],
      },
    ]),
    StoreModule.forRoot({ auth: authReducer, userWatchList: watchlistReducer }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: fetchLoggedUser,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
