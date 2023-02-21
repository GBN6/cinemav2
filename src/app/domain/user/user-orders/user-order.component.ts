import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/core/error/error.component';
import { ErrorhandlerService } from 'src/app/core/interceptor/error-handler.service';
import { MatLoaderComponent } from 'src/app/core/loader/loader.component';
import { UserOrderItemComponent } from './user-order-item/user-order-item.component';
import { UserOrderService } from './user-order.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss'],
  imports: [
    CommonModule,
    UserOrderItemComponent,
    RouterModule,
    MatLoaderComponent,
    ErrorComponent,
  ],
  providers: [UserOrderService],
})
export default class UserOrdersComponent {
  private userOrderService = inject(UserOrderService);
  private route = inject(ActivatedRoute);
  private errorService = inject(ErrorhandlerService);

  errorHandler$ = this.errorService.error$;
  userOrders$ = this.userOrderService.getUserOrders();
}
