import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-summarize',
  standalone: true,
  templateUrl: './summarize.component.html',
  styleUrls: ['./summarize.component.scss'],
  imports: [CommonModule, RouterModule],
})
export default class SummarizeComponent {
  private orderService = inject(OrderService);

  email$ = this.orderService.orderEmail$;
}
