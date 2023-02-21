import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { MoviesCard, Show } from 'src/app/domain/movies/movies.interface';
import {
  Discount,
  FullPrice,
  SelectedDate,
  TicketState,
} from './state.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketStateService {
  private ticketState$$ = new BehaviorSubject<TicketState[]>([]);
  private selectedSeats$$ = new BehaviorSubject<string[]>([]);

  get selectedSeats$() {
    return this.selectedSeats$$.asObservable();
  }

  get ticketState$() {
    return this.ticketState$$.asObservable();
  }

  addTicket(ticket: TicketState) {
    this.ticketState$$.next([...this.ticketState$$.value, ticket]);
  }

  removeTicket(id: string) {
    this.ticketState$$.next(
      this.ticketState$$.value.filter((ticket) => ticket.id !== id)
    );
  }

  addSeat(seat: string) {
    this.selectedSeats$$.next([...this.selectedSeats$$.value, seat]);
  }

  removeSeat(seat: string) {
    this.selectedSeats$$.next(
      this.selectedSeats$$.value.filter((value) => value !== seat)
    );
  }

  checkIfSelectedMovieHasSelectedSeats(
    date: SelectedDate,
    movie: MoviesCard,
    show: Show
  ) {
    let result: string[] = [];
    this.ticketState$$.value.forEach((ticket) => {
      if (
        ticket.movieTitle === movie.title &&
        ticket.date === date.date &&
        ticket.hour === show.hour
      ) {
        result.push(ticket.seat.position);
      }
    });
    this.selectedSeats$$.next(result);
  }

  updateSeatTypeAndPrice(id: string, type: string, price: number) {
    this.ticketState$$.value.map((ticket) => {
      if (ticket.id === id) {
        ticket.seat.type = type;
        ticket.seat.price = price;
      }
    });
  }

  getSelectedShowTickets(date: SelectedDate, movie: MoviesCard, show: Show) {
    return this.ticketState$$.pipe(
      map((tickets) =>
        tickets.filter((ticket) => {
          if (
            ticket.movieTitle === movie.title &&
            ticket.hour === show.hour &&
            ticket.date === date.date
          ) {
            return true;
          }
          return false;
        })
      )
    );
  }

  isTicketCartFUll() {
    if (this.ticketState$$.value.length === 10) return true;
    return false;
  }

  clearTicketsState() {
    this.ticketState$$.next([]);
  }
}
