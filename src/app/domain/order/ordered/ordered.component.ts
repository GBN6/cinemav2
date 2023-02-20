import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { OrderedTicketComponent } from './ordered-ticket/ordered-ticket.component';

@Component({
  selector: 'app-ordered',
  standalone: true,
  templateUrl: './ordered.component.html',
  styleUrls: ['./ordered.component.scss'],
  imports: [CommonModule, OrderedTicketComponent],
  providers: [],
})
export default class OrderedComponent {
  private ordersService = inject(OrderService);
  private route = inject(ActivatedRoute);

  private orderId = this.route.snapshot.params['id'];

  order$ = this.ordersService.getOrderedTickets(this.orderId);
}
