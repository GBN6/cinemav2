import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserOrders } from './user-order.interface';

@Injectable()
export class UserOrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getUserOrders(id: number) {
    return this.http.get<UserOrders[]>(this.apiUrl + `/users/${id}/orders`);
  }
}
