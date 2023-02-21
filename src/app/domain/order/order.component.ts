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
  discountState$ = this.orderService.discount$;
  userId: number | null = null;
  currentPrice: number = 0;
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

  getFullPrice(tickets: TicketState[], discount?: number) {
    let fullPrice = tickets.reduce((total, price) => {
      return (total += +price.seat.price);
    }, 0);

    if (!discount) {
      this.currentPrice = fullPrice;
      return fullPrice;
    }
    if (fullPrice - discount < 0) {
      this.currentPrice = 0;
      return 0;
    }
    this.currentPrice = fullPrice - discount;
    return fullPrice - discount;
  }

  handleUserDataForm(userFormData: UserData) {
    this.userFormData = userFormData;
  }

  handleAddDiscountCode(code: string) {
    this.orderService.addDiscount(code);
  }

  handleModalFlag(status: boolean) {
    this.modalFlag = status;
  }

  submitPayment(tickets: TicketState[]) {
    console.log(tickets);
    console.log(this.currentPrice);
    this.blikControl.markAllAsTouched();
    if (this.blikControl.invalid) {
      return;
    }

    this.orderService.addOrder(
      this.userId,
      this.userFormData,
      this.currentPrice,
      tickets
    );
    this.orderService.removeDiscount();
    this.ticketStateService.clearTicketsState();
    this.router.navigate(['summarize']);
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
