import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectedMovieStatfullService } from 'src/app/shared/services/selectedMovie.statefull.service';
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
  private movieStateService = inject(SelectedMovieStatfullService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  ticketState$ = this.ticketStateService.ticketState$;
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

  getFullPrice(tickets: TicketState[]) {
    return tickets.reduce((total, price) => {
      return (total += price.seat.price);
    }, 0);
  }

  handleUserDataForm(userFormData: UserData) {
    this.userFormData = userFormData;
    console.log(this.userFormData);
  }

  handleModalFlag(status: boolean) {
    this.modalFlag = status;
  }

  submitPayment(tickets: TicketState[]) {
    this.blikControl.markAllAsTouched();
    if (this.blikControl.invalid) {
      return;
    }

    this.orderService.addToReservedSeats(tickets);
    this.orderService.addOrder(this.userFormData, tickets);
    // this.movieStateService.clearMovieAndShowState();
    this.ticketStateService.clearTicketsState();
    this.router.navigate(['summarize']);
  }

  closeModal() {
    this.modalFlag = !this.modalFlag;
  }
}
