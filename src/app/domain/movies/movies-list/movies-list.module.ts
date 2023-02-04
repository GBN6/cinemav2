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

@NgModule({
  declarations: [
    MoviesCardComponent,
    MoviesShowsComponent,
    MoviesListComponent,
    MoviesCardButtonsComponent,
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
  ],
  providers: [MovieShowsService, MoviesListService],
})
export default class EventListModule {}
