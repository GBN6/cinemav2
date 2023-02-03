import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MoviesCard } from '../movies.interface';

@Injectable()
export class MoviesListService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000';

  getMovies(dateId: number) {
    return this.http.get<MoviesCard[]>(this.apiUrl + `/dates/${dateId}/films`);
  }
}
