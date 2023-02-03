import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviesCardComponent } from '../movies-card/movies-card.component';
import { MoviesShowsComponent } from '../movies-shows/movies-shows.component';

@NgModule({
  declarations: [MoviesCardComponent, MoviesShowsComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
      },
    ]),
    CommonModule,
  ],
  providers: [],
})
export default class EventListModule {}
