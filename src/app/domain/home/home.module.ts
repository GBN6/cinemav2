import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { SelectedTicketsGuard } from 'src/app/shared/guards/selected-tickets.guard';
import { SelectedMovieGuard } from 'src/app/shared/guards/selectedMovie.guard';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../movies/movies-list/movies-list.module'),
          },
          {
            path: 'seats/:id',
            loadChildren: () => import('../seats/seats.module'),
            canActivate: [SelectedMovieGuard],
          },
          {
            path: 'order',
            loadChildren: () => import('../order/order.module'),
            canActivate: [SelectedTicketsGuard],
          },
          {
            path: 'summarize',
            loadComponent: () => import('../summarize/summarize.component'),
          },
          {
            path: 'my-tickets/:id',
            loadComponent: () => import('../user-orders/user-order.component'),
            canActivate: [AuthGuard],
          },
          {
            path: 'my-watchlist/:id',
            loadComponent: () =>
              import(
                '../user-watchlist/user-watchlist/user-watchlist.component'
              ),
          },
        ],
      },
    ]),
  ],
})
export default class HomeModule {}
