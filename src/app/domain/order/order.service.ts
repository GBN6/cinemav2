import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { TicketState } from 'src/app/shared/services/state.interface';
import { Show } from '../movies/movies.interface';
import { UserOrders } from '../user/user-orders/user-order.interface';
import { Order, OrderState, UserData } from './order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private orderUrl = 'http://localhost:3000/orders';
  private showUrl = 'http://localhost:3000/show';
  private orderEmail$$ = new BehaviorSubject<OrderState>({} as OrderState);

  get orderEmail$() {
    return this.orderEmail$$.asObservable();
  }

  getOrderedTickets(orderId: number) {
    return this.http.get<UserOrders>(this.orderUrl + `/${orderId}`);
  }

  addOrder(
    userId: number | null,
    userData: UserData,
    fullPrice: number,
    tickets: TicketState[]
  ) {
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
      fullPrice: fullPrice,
      paiedAt: new Date().toString(),
      ticket: tickets,
    };

    if (userId) {
      console.log(userId, 'tu powinno być userID');
      const userOrderDTO = {
        ...orderDTO,
        userId: userId,
      };

      this.orderEmail$$.next({
        ...this.orderEmail$$.value,
        userEmail: userMail,
      });

      this.http.post<Order>(this.orderUrl, userOrderDTO).subscribe((result) =>
        this.orderEmail$$.next({
          ...this.orderEmail$$.value,
          orderId: result.id,
        })
      );
    } else {
      this.orderEmail$$.next({
        ...this.orderEmail$$.value,
        userEmail: userMail,
      });

      this.http.post<Order>(this.orderUrl, orderDTO).subscribe((result) =>
        this.orderEmail$$.next({
          ...this.orderEmail$$.value,
          orderId: result.id,
        })
      );
    }
  }
}

// addToReservedSeats(tickets: TicketState[]) {
//   const copyTickets = [...tickets];
//   console.log(copyTickets);
//   if (copyTickets.length === 0) return;
//   this.getCurrentReservedSeats(copyTickets[0].showId).subscribe(
//     ({ reservedSeats }) => {
//       this.http
//         .patch(`${this.showUrl}/${copyTickets[0].showId}`, {
//           reservedSeats: [...reservedSeats, copyTickets[0].seat.position],
//         })
//         .subscribe((data) => {
//           console.log(data);
//           copyTickets.splice(0, 1);
//           this.addToReservedSeats(copyTickets);
//         });
//     }
//   );
// }

// private getCurrentReservedSeats(number: number) {
//   return this.http.get<Show>(`${this.showUrl}/${number}`);
// }
