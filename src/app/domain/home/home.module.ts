import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
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
            path: 'admin-panel',
            loadChildren: () => import('../admin/admin.module'),
            canMatch: [AdminGuard],
          },
          {
            path: '',
            redirectTo: 'day',
            pathMatch: 'full',
          },
          {
            path: 'day',
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
            path: 'my-tickets',
            loadComponent: () =>
              import('../user/user-orders/user-order.component'),
            canActivate: [AuthGuard],
          },
          {
            path: 'my-watchlist',
            loadComponent: () =>
              import(
                '../user/user-watchlist/user-watchlist/user-watchlist.component'
              ),
          },
        ],
      },
    ]),
  ],
  providers: [],
})
export default class HomeModule {}
