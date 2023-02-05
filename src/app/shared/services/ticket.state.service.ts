import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketStateService {
  private selectedSeats$$ = new BehaviorSubject<string[]>([]);

  get selectedSeats$() {
    return this.selectedSeats$$.asObservable();
  }

  addSeat(seat: string) {
    this.selectedSeats$$.next([...this.selectedSeats$$.value, seat]);
  }

  removeSeat(seat: string) {
    this.selectedSeats$$.next(
      this.selectedSeats$$.value.filter((value) => value !== seat)
    );
  }
}
