import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Shows } from '../movies.interface';
import { MovieShowsService } from './movies-shows.service';

@Component({
  selector: 'app-movies-shows[movieId]',
  templateUrl: './movies-shows.component.html',
  styleUrls: ['./movies-shows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesShowsComponent {
  @Input() movieId!: number;

  private showsService = inject(MovieShowsService);

  shows$: Observable<Shows[]> | null = null;

  ngOnInit() {
    this.shows$ = this.showsService.getShow(this.movieId);
  }
}
