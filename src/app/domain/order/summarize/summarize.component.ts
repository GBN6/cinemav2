import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketStateService } from 'src/app/shared/services/ticket.state.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-summarize',
  standalone: true,
  templateUrl: './summarize.component.html',
  styleUrls: ['./summarize.component.scss'],
  imports: [CommonModule, RouterModule],
})
export default class SummarizeComponent {
  private orderService = inject(OrderService);
  private ticketService = inject(TicketStateService);

  barcodeApiUrl = 'https://barcodeapi.org/api/qr/';

  email$ = this.orderService.orderEmail$;

  ngOnInit() {
    this.ticketService.clearTicketsState();
  }
}
