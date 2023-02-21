import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorComponent } from 'src/app/core/error/error.component';
import { ErrorhandlerService } from 'src/app/core/interceptor/error-handler.service';
import { MatLoaderComponent } from 'src/app/core/loader/loader.component';
import { OrderService } from '../order.service';
import { OrderedTicketComponent } from './ordered-ticket/ordered-ticket.component';

@Component({
  selector: 'app-ordered',
  standalone: true,
  templateUrl: './ordered.component.html',
  styleUrls: ['./ordered.component.scss'],
  imports: [
    CommonModule,
    OrderedTicketComponent,
    MatLoaderComponent,
    ErrorComponent,
  ],
  providers: [],
})
export default class OrderedComponent {
  private ordersService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private errorService = inject(ErrorhandlerService);

  private orderId = this.route.snapshot.params['id'];

  order$ = this.ordersService.getOrderedTickets(this.orderId);
  errorHandler$ = this.errorService.error$;
}
