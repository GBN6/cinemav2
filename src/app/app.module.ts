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

export interface AppState {
  auth: AuthState;
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
    StoreModule.forRoot({ auth: authReducer }),
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
