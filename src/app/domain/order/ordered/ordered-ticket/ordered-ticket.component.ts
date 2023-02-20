import { Component, Input } from '@angular/core';
import { UserOrdersTicket } from 'src/app/domain/user/user-orders/user-order.interface';

@Component({
  selector: 'app-ordered-ticket[orderedTicket]',
  standalone: true,
  templateUrl: './ordered-ticket.component.html',
  styleUrls: ['./ordered-ticket.component.scss'],
})
export class OrderedTicketComponent {
  @Input() orderedTicket!: UserOrdersTicket;

  barcodeApiUrl = 'https://barcodeapi.org/api/128/';
}
