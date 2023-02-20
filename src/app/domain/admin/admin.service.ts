import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { MoviesCard } from '../movies/movies.interface';
import {
  FetchedGenre,
  FetchedMovie,
  FetchedScreen,
  FetchedShows,
  Film,
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

  addNewMovieToDate(film: Film) {
    console.log(film);
    return this.http.post(`${this.apiUrl}/films`, film);
  }

  getAllMovies() {
    return this.http.get<FetchedMovie[]>(`${this.apiUrl}/movies`);
  }

  getAllFilms() {
    return this.http.get<Film[]>(`${this.apiUrl}/films`);
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
        let selectedMovietimeSlot = this.selectedHourTimeSlot(
          selectedHour,
          selectedMovieLength
        );
        if (results.length === 0) return true;
        if (results.length === 1) {
          let showTimeSLot = this.selectedHourTimeSlot(
            results[0].hour,
            results[0].movieLength + 15
          );
          if (selectedHour === results[0].hour) return false;
          if (
            selectedHour > showTimeSLot.latestHour ||
            selectedMovietimeSlot.latestHour < results[0].hour
          )
            return true;
          return false;
        }
        const sorted = results.sort((showA, showB) =>
          showA.hour > showB.hour ? 1 : -1
        );
        console.log(sorted);

        for (let i = 0; i < sorted.length; i++) {
          let showTimeSLot = this.selectedHourTimeSlot(
            sorted[i].hour,
            sorted[i].movieLength + 15
          );
          console.log('wybrana godzina', selectedHour);
          console.log('godzina dodanego seansu', sorted[i].hour);
          console.log(
            'godzina zakończenia poprzedniego seansu',
            showTimeSLot.latestHour
          );
          console.log(
            'godzina zakończenia aktualnie wybranego filmu',
            selectedMovietimeSlot.latestHour
          );

          console.log('godzina koljengo seansu', sorted[i + 1]);

          if (i === sorted.length - 1) {
            if (selectedHour < showTimeSLot.latestHour) return false;
            return true;
          }

          if (selectedHour === sorted[i].hour) return false;
          if (selectedMovietimeSlot.latestHour < sorted[i].hour) return true;
          if (
            selectedHour > showTimeSLot.latestHour &&
            selectedMovietimeSlot.latestHour < sorted[i + 1].hour
          ) {
            return true;
          } else if (selectedMovietimeSlot.latestHour > sorted[i + 1].hour) {
            continue;
          }

          return false;
        }
        return 'ERROR';
      })
    );
  }

  //   if (selectedHour > sorted[i + 1].hour) return true;

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
