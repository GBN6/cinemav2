import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Discount, TicketState } from 'src/app/shared/services/state.interface';
import { TicketStateService } from 'src/app/shared/services/ticket.state.service';
import { Show } from '../movies/movies.interface';
import { UserOrders } from '../user/user-orders/user-order.interface';
import { Order, OrderState, UserData } from './order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private ticketStateService = inject(TicketStateService);

  private orderUrl = 'http://localhost:3000/orders';
  private codeUrl = 'http://localhost:3000/coupons';

  private orderEmail$$ = new BehaviorSubject<OrderState>({} as OrderState);
  private discountCodeState$$ = new BehaviorSubject<Discount | null>(null);

  get orderEmail$() {
    return this.orderEmail$$.asObservable();
  }

  get discount$() {
    return this.discountCodeState$$.asObservable();
  }

  getOrderedTickets(orderId: number) {
    return this.http.get<UserOrders>(this.orderUrl + `/${orderId}`);
  }

  addDiscount(code: string) {
    this.http
      .get<Discount[]>(`${this.codeUrl}?code=${code}`)
      .subscribe((result) => {
        this.discountCodeState$$.next(result[0]);
        this.deleteDiscountCodeFromDB(result[0].id).subscribe();
      });
  }

  removeDiscount() {
    this.discountCodeState$$.next(null);
  }

  deleteDiscountCodeFromDB(couponId: number) {
    return this.http.delete(`${this.codeUrl}/${couponId}`);
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

      this.http.post<Order>(this.orderUrl, userOrderDTO).subscribe((result) => {
        this.orderEmail$$.next({
          ...this.orderEmail$$.value,
          orderId: result.id,
        });
        this.removeDiscount();
        this.router.navigate(['order/summarize']);
      });
    } else {
      this.orderEmail$$.next({
        ...this.orderEmail$$.value,
        userEmail: userMail,
      });

      this.http.post<Order>(this.orderUrl, orderDTO).subscribe((result) => {
        this.orderEmail$$.next({
          ...this.orderEmail$$.value,
          orderId: result.id,
        });
        this.removeDiscount();
        this.router.navigate(['order/summarize']);
      });
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
