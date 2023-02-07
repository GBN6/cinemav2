import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { TicketState } from 'src/app/shared/services/state.interface';
import { Show } from '../movies/movies.interface';
import { Order, UserData } from './order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private orderUrl = 'http://localhost:3000/orders';
  private showUrl = 'http://localhost:3000/show';
  private orderEmail$$ = new ReplaySubject<string>(1);

  private orderId?: number = 0;

  get orderEmail$() {
    return this.orderEmail$$.asObservable();
  }

  private getCurrentReservedSeats(number: number) {
    return this.http.get<Show>(`${this.showUrl}/${number}`);
  }

  addOrder(userData: UserData, tickets: TicketState[]) {
    const {
      userName,
      userLastName,
      userMail,
      discountCode,
      userPhoneNumber,
      userInvoiceForm,
    } = userData;

    const orderDTO = {
      id: 0,
      userName,
      userLastName,
      userMail,
      discountCode,
      userPhoneNumber,
      userInvoiceForm,
      paiedAt: new Date().toString(),
      ticket: tickets,
    };

    this.orderEmail$$.next(userMail);
    this.http.post<Order>(this.orderUrl, orderDTO).subscribe();
  }

  addToReservedSeats(tickets: TicketState[]) {
    const copyTickets = [...tickets];
    console.log(copyTickets);
    if (copyTickets.length === 0) return;
    this.getCurrentReservedSeats(copyTickets[0].showId).subscribe(
      ({ reservedSeats }) => {
        this.http
          .patch(`${this.showUrl}/${copyTickets[0].showId}`, {
            reservedSeats: [...reservedSeats, copyTickets[0].seat.position],
          })
          .subscribe((data) => {
            console.log(data);
            copyTickets.splice(0, 1);
            this.addToReservedSeats(copyTickets);
          });
      }
    );
  }
}
