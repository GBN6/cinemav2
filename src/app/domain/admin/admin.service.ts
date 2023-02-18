import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  FetchedGenre,
  FetchedMovie,
  FetchedScreen,
  Movie,
  PegiRating,
} from './admin.interface';

@Injectable()
export class AdminPanelService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  addNewMovie(movie: Movie) {
    return this.http.post(this.apiUrl + `/movies`, movie);
  }

  getAllMovies() {
    return this.http.get<FetchedMovie[]>(`${this.apiUrl}/movies`);
  }

  getAllScreens() {
    return this.http.get<FetchedScreen[]>(`${this.apiUrl}/screen`);
  }

  getAllPegiRatings() {
    return this.http.get<PegiRating[]>(`${this.apiUrl}/pegi`).pipe(
      map((result) => {
        return result.map((genre) => {
          return genre.name;
        });
      })
    );
  }

  getAllGenres() {
    return this.http.get<FetchedGenre[]>(`${this.apiUrl}/movieGenres`).pipe(
      map((result) => {
        return result.map((genre) => {
          return genre.name;
        });
      })
    );
  }
}
