import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Screen } from './seats.interface';

@Injectable()
export class SeatsService {
  private http = inject(HttpClient);
  private selectedSeats$$ = new BehaviorSubject<string[]>([]);

  get selectedSeats() {
    let seats = [''];
    this.selectedSeats$$.subscribe((result) => (seats = result));
    return seats;
  }

  addSeat(seat: string) {
    this.selectedSeats$$.next([...this.selectedSeats$$.value, seat]);
  }

  removeSeat(seat: string) {
    this.selectedSeats$$.next(
      this.selectedSeats$$.value.filter((value) => value !== seat)
    );
  }

  getScreen(name?: string) {
    return this.http.get<Screen[]>(`http://localhost:3000/screen?q=${name}`);
  }

  getRowsArray(n: number): string[] {
    return [...Array(n).keys()].map((i) => String.fromCharCode(i + 65));
  }

  getColumnsArray(n: number): number[] {
    return [...Array(n).keys()].map((i) => i + 1);
  }
}
