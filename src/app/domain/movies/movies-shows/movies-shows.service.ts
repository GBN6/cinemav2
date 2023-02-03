import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Shows } from '../movies.interface';

@Injectable()
export class MovieShowsService {
  private http = inject(HttpClient);
  private movieUrl = 'http://localhost:3000/films';

  getShow(id: number) {
    return this.http.get<Shows[]>(this.movieUrl + `/${id}/show`);
  }
}
