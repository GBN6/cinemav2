import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviesCardComponent } from '../movies-card/movies-card.component';
import { MoviesShowsComponent } from '../movies-shows/movies-shows.component';
import { MoviesListComponent } from './movies-list.component';
import { MovieShowsService } from '../movies-shows/movies-shows.service';
import { MoviesListService } from './movies-list.service';
import { FooterComponent } from 'src/app/shared/footer/footer.compononet';
import { MoviesCardButtonsComponent } from '../movies-card/movies-card-buttons/movies-card-buttons.component';
import { UserMovieRatingComponent } from '../movies-card/user-movie-rating/user-movie-rating.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MoviesDatesComponent } from '../movies-dates/movies-dates.component';
import { MatLoaderComponent } from 'src/app/core/loader/loader.component';
import { ErrorComponent } from 'src/app/core/error/error.component';
import { NotAdminGuard } from 'src/app/shared/guards/not-admin.guard';

function getToday() {
  const date = new Date();
  return (date.getDay() - 1).toString();
}

@NgModule({
  declarations: [
    MoviesCardComponent,
    MoviesShowsComponent,
    MoviesListComponent,
    MoviesCardButtonsComponent,
    UserMovieRatingComponent,
    MoviesDatesComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: ':id',
        component: MoviesListComponent,
      },
      {
        path: '',
        redirectTo: getToday(),
        pathMatch: 'full',
      },
    ]),
    CommonModule,
    FooterComponent,
    MatDialogModule,
    FontAwesomeModule,
    MatLoaderComponent,
    ErrorComponent,
  ],
  providers: [MovieShowsService, MoviesListService],
})
export default class EventListModule {}
