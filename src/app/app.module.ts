import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AuthState } from './auth/auth.interface';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './auth/store/auth.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { UserWatchlistInitialState } from './domain/user/user-watchlist/store/watchlist.state';
import { watchlistReducer } from './domain/user/user-watchlist/store/watchlist.reducer';
import { userWatchlistEffects } from './domain/user/user-watchlist/store/watchlist.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fetchLoggedUser } from './auth/fetch-logge-user';
import { LoaderInterceptor } from './core/interceptor/loader-handler.interceptor';
import { ErrorhandlerInterceptor } from './core/interceptor/error.interceptor';

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
    EffectsModule.forRoot([AuthEffects, userWatchlistEffects]),
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorhandlerInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: fetchLoggedUser,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
