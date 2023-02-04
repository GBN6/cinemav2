import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Show } from '../movies.interface';

@Injectable()
export class MovieShowsService {
  private http = inject(HttpClient);
  private movieUrl = 'http://localhost:3000/films';

  getShows(id: number) {
    return this.http.get<Show[]>(this.movieUrl + `/${id}/show`);
  }
}
