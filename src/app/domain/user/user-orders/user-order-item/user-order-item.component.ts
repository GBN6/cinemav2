import { Component, Input } from '@angular/core';
import { UserOrdersTicket } from '../user-order.interface';

@Component({
  selector: 'app-user-order-item[userOrderItem]',
  standalone: true,
  templateUrl: './user-order-item.component.html',
  styleUrls: ['./user-order-item.component.scss'],
})
export class UserOrderItemComponent {
  @Input() userOrderItem!: UserOrdersTicket;
}
