import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { TicketState } from 'src/app/shared/services/state.interface';
import { TicketStateService } from 'src/app/shared/services/ticket.state.service';
import { UserData } from './order.interface';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  private ticketStateService = inject(TicketStateService);
  private orderService = inject(OrderService);
  private store = inject<Store<AppState>>(Store);
  private router = inject(Router);

  private subscription = new Subscription();

  ticketState$ = this.ticketStateService.ticketState$;
  userId: number | null = null;
  userFormData!: UserData;

  modalFlag = false;

  blikControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(6),
      Validators.maxLength(6),
    ],
  });

  getUserId() {
    const sub = this.store
      .select((state) => state.auth.id)
      .subscribe((result) => {
        this.userId = result;
      });
    this.subscription.add(sub);
  }

  getFullPrice(tickets: TicketState[]) {
    return tickets.reduce((total, price) => {
      return (total += +price.seat.price);
    }, 0);
  }

  handleUserDataForm(userFormData: UserData) {
    this.userFormData = userFormData;
  }

  handleModalFlag(status: boolean) {
    this.modalFlag = status;
  }

  submitPayment(tickets: TicketState[]) {
    console.log(tickets);
    this.blikControl.markAllAsTouched();
    if (this.blikControl.invalid) {
      return;
    }

    // this.orderService.addToReservedSeats(tickets);
    this.orderService.addOrder(
      this.userId,
      this.userFormData,
      this.getFullPrice(tickets),
      tickets
    );
    // this.movieStateService.clearMovieAndShowState();
    this.router.navigate(['summarize']);
    this.ticketStateService.clearTicketsState();
  }

  closeModal() {
    this.modalFlag = !this.modalFlag;
  }

  ngOnInit() {
    this.getUserId();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
