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

@NgModule({
  declarations: [
    MoviesCardComponent,
    MoviesShowsComponent,
    MoviesListComponent,
    MoviesCardButtonsComponent,
    UserMovieRatingComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MoviesListComponent,
      },
    ]),
    CommonModule,
    FooterComponent,
    MatDialogModule,
    FontAwesomeModule,
  ],
  providers: [MovieShowsService, MoviesListService],
})
export default class EventListModule {}
