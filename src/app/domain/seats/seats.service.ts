import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, mergeMap, of, tap } from 'rxjs';
import { Show } from '../movies/movies.interface';
import { Screen, ScreenGrid } from './seats.interface';

@Injectable()
export class SeatsService {
  private http = inject(HttpClient);
  private screenGrid$$ = new BehaviorSubject<ScreenGrid>({} as ScreenGrid);

  private apiUrl = 'http://localhost:3000';

  get screenGrid$() {
    return this.screenGrid$$.asObservable();
  }

  private getScreen(name?: string) {
    return this.http.get<Screen[]>(`http://localhost:3000/screen?q=${name}`);
  }

  private getRowsArray(n: number): string[] {
    return [...Array(n).keys()].map((i) => String.fromCharCode(i + 65));
  }

  private getColumnsArray(n: number): number[] {
    return [...Array(n).keys()].map((i) => i + 1);
  }

  private getCurrentReservedSeats(number: number) {
    return this.http.get<Show>(`${this.apiUrl}/show/${number}`);
  }

  reserveSeat(seat: string, showId: number) {
    this.getCurrentReservedSeats(showId).subscribe(({ reservedSeats }) => {
      this.http
        .patch(`${this.apiUrl}/show/${showId}`, {
          reservedSeats: [...reservedSeats, seat],
        })
        .subscribe((data) => {
          console.log(data);
        });
    });
  }

  cancelReservation(seat: string, showId: number) {
    this.getCurrentReservedSeats(showId)
      .pipe(
        map(({ reservedSeats }) => {
          return reservedSeats.filter((seatPos) => seatPos !== seat);
        })
      )
      .subscribe((reservedSeats) => {
        this.http
          .patch(this.apiUrl + `/show/${showId}`, {
            reservedSeats: reservedSeats,
          })
          .subscribe();
      });
  }

  getScreenRowsAndCols(screenName: string) {
    this.getScreen(screenName)
      .pipe(
        tap((item) => item),
        mergeMap((item) => item)
      )
      .subscribe((item) => {
        this.screenGrid$$.next({
          rows: this.getRowsArray(item.rows),
          cols: this.getColumnsArray(item.colu),
          specialSeats: item.specialSeats,
        });
      });
  }
}
