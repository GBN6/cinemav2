import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserOrderItemComponent } from './user-order-item/user-order-item.component';
import { UserOrderService } from './user-order.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss'],
  imports: [CommonModule, UserOrderItemComponent, RouterModule],
  providers: [UserOrderService],
})
export default class UserOrdersComponent {
  private userOrderService = inject(UserOrderService);
  private route = inject(ActivatedRoute);

  private userId = this.route.snapshot.params['id'];

  userOrders$ = this.userOrderService.getUserOrders();
}
