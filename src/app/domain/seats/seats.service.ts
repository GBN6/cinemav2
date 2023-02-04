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

  getScreen(name?: string) {
    return this.http.get<Screen[]>(`http://localhost:3000/screen?q=${name}`);
  }

  getRows(n: number): string[] {
    return [...Array(n).keys()].map((i) => String.fromCharCode(i + 65));
  }

  getColumns(n: number): number[] {
    return [...Array(n).keys()].map((i) => i + 1);
  }
}
