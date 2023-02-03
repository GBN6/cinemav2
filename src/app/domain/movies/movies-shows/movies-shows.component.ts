import { Component, inject, Input } from '@angular/core';
import { MovieShowsService } from './movies-shows.service';

@Component({
  selector: 'app-movies-shows[movieId]',
  templateUrl: './movies-shows.component.html',
  styleUrls: ['./movies-shows.component.scss'],
})
export class MoviesShowsComponent {
  @Input() movieId!: number;
  private showsService = inject(MovieShowsService);

  shows$ = this.showsService.getShow(this.movieId);
}
