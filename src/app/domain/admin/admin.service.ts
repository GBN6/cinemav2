import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { FetchedGenre, PegiRating } from './admin.interface';

@Injectable()
export class AdminPanelService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

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
