import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  combineLatest,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  take,
} from 'rxjs';
import {
  FetchedGenre,
  FetchedMovie,
  FetchedScreen,
  FetchedShows,
  Movie,
  PegiRating,
  Show,
} from './admin.interface';

@Injectable()
export class AdminPanelService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  addNewMovie(movie: Movie) {
    return this.http.post(this.apiUrl + `/movies`, movie);
  }

  addNewShow(show: Show) {
    return this.http.post(this.apiUrl + `/show`, show);
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

  getShows(dateId: number, screenName: string) {
    return this.http.get<FetchedShows[]>(
      `${this.apiUrl}/show?dateId=${dateId}&screen=${screenName}`
    );
  }

  selectedHourTimeSlot(selectedHour: string, movieLength: number) {
    let result = {
      earliestHour: '',
      latestHour: '',
    };

    let selectedHourToMinutes = this.convertToMinutes(selectedHour);
    let earliest = selectedHourToMinutes - movieLength;
    let latest = selectedHourToMinutes + movieLength;

    result.earliestHour = this.convertToHoursAndMinutes(earliest);
    result.latestHour = this.convertToHoursAndMinutes(latest);

    return result;
  }

  isDateAvaible(
    selectedHour: string,
    selectedMovieLength: number,
    dateId: number,
    screenName: string
  ) {
    return this.getShows(dateId, screenName).pipe(
      switchMap((shows) => {
        const movieIds = shows.map((show) => show.movieId);
        if (movieIds.length === 0) return of([]);
        const movieLengthReq = movieIds.map((movieId) =>
          this.getMovieLength(movieId)
        );
        return forkJoin(movieLengthReq).pipe(
          map((movieLengths) => {
            return shows.map((show, index) => {
              return {
                ...show,
                movieLength: movieLengths[index],
              };
            });
          })
        );
      }),
      map((results) => {
        if (results.length === 0) return true;
        if (results.length === 1) {
          let showTimeSLot = this.selectedHourTimeSlot(
            results[0].hour,
            results[0].movieLength + 15
          );
          if (selectedHour > showTimeSLot.latestHour) return true;
          return false;
        }
        for (let i = 0; i < results.length; i++) {
          let showTimeSLot = this.selectedHourTimeSlot(
            results[i].hour,
            results[i].movieLength + 15
          );
          let selectedMovietimeSlot = this.selectedHourTimeSlot(
            selectedHour,
            selectedMovieLength
          );
          console.log('wybrana godzina', selectedHour);
          console.log(
            'godzina zakończenia poprzedniego seansu',
            showTimeSLot.latestHour
          );
          console.log(
            'godzina zakończenia aktualnie wybranego filmu',
            selectedMovietimeSlot.latestHour
          );
          console.log(
            'godzina rozpoczecia kolejnego seansu',
            results[i + 1].hour
          );
          if (
            selectedHour > showTimeSLot.latestHour &&
            selectedMovietimeSlot.latestHour < results[i + 1].hour
          ) {
            return true;
          }
          return false;
        }
        return 'ERROR';
      })
    );
  }

  private getMovieLength(movieId: number) {
    return this.http.get<FetchedMovie>(`${this.apiUrl}/movies/${movieId}`).pipe(
      map((result) => {
        return +result.length.split(' ')[0];
      })
    );
  }

  private splitHourIntoArray(hour: string) {
    return hour.split(':');
  }

  private convertToMinutes(hour: string) {
    const array = this.splitHourIntoArray(hour);
    return +array[0] * 60 + +array[1];
  }

  private convertToHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    if (minutes < 10) {
      return `${hours}:0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }
}
