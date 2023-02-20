import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Show } from '../movies.interface';

@Injectable()
export class MovieShowsService {
  private http = inject(HttpClient);
  private movieUrl = 'http://localhost:3000/show';

  getShows(movieId: number, dateId: number) {
    return this.http
      .get<Show[]>(this.movieUrl + `?movieId=${movieId}&dateId=${dateId}`)
      .pipe(
        map((result) =>
          result.sort((showA, showB) => (showA.hour > showB.hour ? 1 : -1))
        )
      );
  }
}
