import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  barcodeApiUrl = 'https://barcodeapi.org/api/qr/';

  email$ = this.orderService.orderEmail$;
}
