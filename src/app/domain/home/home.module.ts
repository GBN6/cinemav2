import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { NotAdminGuard } from 'src/app/shared/guards/not-admin.guard';
import { SelectedTicketsGuard } from 'src/app/shared/guards/selected-tickets.guard';
import { SelectedMovieGuard } from 'src/app/shared/guards/selectedMovie.guard';
import { UserOrVisitor } from 'src/app/shared/guards/user-or-visitor.guard';
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
            redirectTo: 'day',
            pathMatch: 'full',
          },
          {
            path: 'day',
            loadChildren: () =>
              import('../movies/movies-list/movies-list.module'),
            canActivate: [UserOrVisitor],
          },
          {
            path: 'admin-panel',
            loadChildren: () => import('../admin/admin.module'),
            canMatch: [AdminGuard],
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
            path: 'my-tickets',
            loadComponent: () =>
              import('../user/user-orders/user-order.component'),
            canActivate: [AuthGuard, NotAdminGuard],
          },
          {
            path: 'my-watchlist',
            loadComponent: () =>
              import(
                '../user/user-watchlist/user-watchlist/user-watchlist.component'
              ),
            canActivate: [AuthGuard, NotAdminGuard],
          },
          {
            path: 'order/:id',
            loadComponent: () => import('../order/ordered/ordered.component'),
          },
        ],
      },
    ]),
  ],
  providers: [],
})
export default class HomeModule {}
